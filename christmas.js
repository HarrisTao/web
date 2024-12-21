// 获取当前日期和活动开始日期的时间戳
const eventStartDate = new Date("2024-12-25T00:00:00").getTime();
const currentDate = new Date().getTime();

// 开发者绕过时间限制功能
function checkDeveloperAccess() {
  // 假设开发者用户名和密码
  const developerUsername = "developer";
  const developerPassword = "devpassword123";

  const enteredUsername = prompt("请输入开发者用户名：");
  const enteredPassword = prompt("请输入开发者密码：");

  if (enteredUsername === developerUsername && enteredPassword === developerPassword) {
    alert("开发者登录成功，您可以绕过所有限制！");
    return true;
  } else {
    alert("用户名或密码错误！");
    return false;
  }
}

// 开发者验证
let isDeveloper = false;
if (checkDeveloperAccess()) {
  isDeveloper = true;
}

// 如果不是开发者且活动未开始，跳转回首页
if (!isDeveloper && currentDate < eventStartDate) {
  alert("活动尚未开始，请稍后访问！");
  window.location.href = "index.html"; // 返回首页
} else {
  // 显示活动内容
  document.getElementById("main-content").style.display = "block"; // 显示活动内容
}

// 更新倒计时
function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = eventStartDate - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `距离活动开始：${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "活动开始！";
  }
}

// 生成圣诞树
function createChristmasTree() {
  const treeContainer = document.getElementById("christmas-tree");

  const tree = document.createElement("div");
  tree.classList.add("tree");

  const star = document.createElement("div");
  star.classList.add("star");

  tree.appendChild(star);
  treeContainer.appendChild(tree);
}

// 每秒更新倒计时
const countdownInterval = setInterval(updateCountdown, 1000);

// 页面加载时生成圣诞树
document.addEventListener("DOMContentLoaded", createChristmasTree);
