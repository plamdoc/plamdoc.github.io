let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0;

const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

noButton.addEventListener("click", function () {
  clickCount++;

  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  if (clickCount === 1) mainImage.src = "images/shocked.png";
  if (clickCount === 2) mainImage.src = "images/think.png";
  if (clickCount === 3) mainImage.src = "images/angry.png";
  if (clickCount === 4) mainImage.src = "images/crying.png";
  if (clickCount >= 5) mainImage.src = "images/crying.png";
});

const loveTest = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

function calculateLoveTime() {
  const startDate = new Date('2025-02-19T00:00:00');
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const formatNumber = (num) => num.toString().padStart(2, '0');
  
  return {
    days,
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds)
  };
}

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
  window.scrollTo(0, 0);
  
  document.body.innerHTML = `
    <div class="yes-screen">
      <h1 class="yes-text"></h1>
      <img src="images/hug.png" alt="拥抱" class="yes-image">
      <div id="loveTime" class="days-together"></div>
    </div>
  `;

  document.querySelector(".yes-text").innerText = loveTest;
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 1000);

  document.body.style.overflow = "hidden";
});
