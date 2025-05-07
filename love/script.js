let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
  if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

// 计算并格式化在一起的时间
function calculateLoveTime() {
  // 设置起始日期为 2025 年 5 月 19 日
  const startDate = new Date('2025-05-07T00:00:00');
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;

  // 计算天、时、分、秒
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // 格式化显示，确保两位数
  const formatNumber = (num) => num.toString().padStart(2, '0');
  
  return {
    days,
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds)
  };
}

// 更新时间显示
function updateTimeDisplay() {
  const timeElement = document.getElementById('loveTime');
  if (timeElement) {
    const { days, hours, minutes, seconds } = calculateLoveTime();
    timeElement.innerHTML = `我们已经相爱了：<br>
                             ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒<br>
                             `;
  }
}

yesButton.addEventListener("click", function () {
  // 创建表白成功页面，添加时间显示元素
  document.body.innerHTML = `
    <div class="yes-screen">
      <h1 class="yes-text"></h1>
      <img src="images/hug.png" alt="拥抱" class="yes-image">
      <div id="loveTime" class="days-together"></div>
    </div>
  `;

  // 设置表白文本
  document.querySelector(".yes-text").innerText = loveTest;
  
  // 首次更新时间
  updateTimeDisplay();
  
  // 每秒更新一次时间
  setInterval(updateTimeDisplay, 1000);

  // 禁止滚动
  document.body.style.overflow = "hidden";
});
