<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>安全支付W</title>
    <link href="css/pay.css" rel="stylesheet">
    <link href="css/layer.css" rel="stylesheet">
    <link href="css/paybtn.css" rel="stylesheet">
    <link href="css/toastr.min.css" rel="stylesheet">
    <style>
        /* 这里添加你的自定义样式 */
        @media screen and (max-width: 768px) {
            /* 在小屏幕上的样式 */
            /* 可以在这里定义一些针对小屏幕的特定样式 */
        }
    </style>
</head>
<body>

<div class="body">
    <h1 class="mod-title">
        <span class="ico_log ico-3"></span>
    </h1>
    <div class="mod-ct">
        <div class="order"></div>
        <div class="amount" id="timeOut" style="font-size: 20px;color: red;display: none;">
            <p>订单已过期，请您重新发起支付</p><br>
        </div>
        <div id="orderbody">
            <div class="amount"><span id="copy_money">订单金额：¥<span id="orderPrice"></span></span></div>
            <div class="copybtn" style="display: none;" ><a class="mb-sm btn btn-success" id="copy_p">复制金额</a></div>
            <div class="qrcode-img-wrapper" data-role="qrPayImgWrapper">
                <div data-role="qrPayImg" class="qrcode-img-area">
                    <div class="ui-loading qrcode-loading" data-role="qrPayImgLoading" style="display: none;">加载中</div>
                    <div style="position: relative;display: inline-block;">
                         <img alt="加载中..." id="src" src="images/wx.jpg" width="250" height="250" style="display: block;">
                    </div>
                </div>
            </div>
            <div class="time-item">
                <div class="time-item" id="msg">
                    <h1><span style="color:red">请按商品金额付款,注意不能多付或少付 <br>请在规定时间内及时付款，失效请勿付款<br>支付未跳转请点击右下角联系补发</span><br></h1>
                </div>
                <strong id="hour_show">0时</strong>
                <strong id="minute_show">0分</strong>
                <strong id="second_show">0秒</strong>
            </div>
            <div class="tip">
                <div class="ico-scan"></div>
                <div class="tip-text">
                    <p>请使用<span id="payType1"></span>扫一扫</p>
                    <p>扫描二维码完成支付</p>
                </div>
            </div>
            <div class="detail" id="orderDetail">
                <dl class="detail-ct" id="desc" style="display: none;">
                    <dt>商户订单号：</dt>
                    <dd id="orderId">123456789</dd>
                    <dt>订单名称：</dt>
                    <dd id="orderName">商品名称</dd>
                    <dt>订单金额：</dt>
                    <dd><?php echo $_GET['price']; ?></dd>
                    <dt>订单状态</dt>
                    <dd>待付款</dd>
                </dl>
                <a href="javascript:void(0)" class="arrow" onclick="toggleDesc()"><i class="ico-arrow"></i></a>
            </div>
        </div>
    </div>
    <div class="foot">
        <div class="inner">
            <p>手机用户可保存上方二维码到手机中</p>
            <p>在扫一扫中选择“相册”即可</p>
            <p>如有纠纷与本平台无关</p>
        </div>
    </div>
</div>

<div class="copyRight"></div>

<script src="js/jquery.min.js"></script>
<script src="js/clipboard.min.js"></script>
<script src="js/toastr.min.js"></script>
<script src="js/layer.js"></script>
<script>
    function toggleDesc() {
        var desc = document.getElementById('desc');
        desc.style.display === 'none' ? desc.style.display = 'block' : desc.style.display = 'none';
    }

    function generateOrderId() {
        var now = new Date();
        var orderId = now.getFullYear() + '' + (now.getMonth() + 1) + '' + now.getDate() + '' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
        document.getElementById('orderId').innerText = orderId;
    }

    window.onload = function() {
        generateOrderId();
        var urlParams = new URLSearchParams(window.location.search);
        var price = urlParams.get('price');
        var name = urlParams.get('product');
        document.getElementById('orderPrice').innerText = price ? price : '0.00';
        document.getElementById('orderName').innerText = name ? name : '商品名称';
    };
</script>

<script>
  function formatDate(now) {
    now = new Date(now * 1000);
    return now.toISOString().slice(0, 19).replace('T', ' ');
}

let myTimer;
function timer(intDiff) {
    let day = 0, hour = 0, minute = 0, second = 0;
    if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    minute = minute.toString().padStart(2, '0');
    second = second.toString().padStart(2, '0');
    $('#hour_show').html('<s id="h"></s>' + hour + '时');
    $('#minute_show').html('<s></s>' + minute + '分');
    $('#second_show').html('<s></s>' + second + '秒');
    if (hour <= 0 && minute <= 0 && second <= 0) {
        qrcode_timeout()
        clearInterval(myTimer);
    }
    intDiff--;

    myTimer = setInterval(function () {
        let day = 0, hour = 0, minute = 0, second = 0;
        if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        minute = minute.toString().padStart(2, '0');
        second = second.toString().padStart(2, '0');
        $('#hour_show').html('<s id="h"></s>' + hour + '时');
        $('#minute_show').html('<s></s>' + minute + '分');
        $('#second_show').html('<s></s>' + second + '秒');
        if (hour <= 0 && minute <= 0 && second <= 0) {
            qrcode_timeout()
            clearInterval(myTimer);
        }
        intDiff--;
    }, 1000);
}

function qrcode_timeout(){
    clearInterval(orderlst);
    $("#src").attr('src', "images/guoqi.png");
    document.getElementById("orderbody").style.display = "none";
    document.getElementById("timeOut").style.display = "";
}

$(function() {
    const intDiff = 10 * 60;
    timer(intDiff);
});
</script>

<script>
    function speckText(str) {
        var url = "css/yuyin.mp3";
        var voiceContent = new Audio(url);
        voiceContent.src = url;
        voiceContent.play();
    }

    speckText(0);
</script>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-78"
     crossorigin="anonymous"></script>
<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="003dd431-bacc-438f-b57a-5ec2dc030618";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
</body>
</html>
