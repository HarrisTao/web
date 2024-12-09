// 获取倒计时元素
const christmasCountdown = document.getElementById('christmas-countdown');
const newYearCountdown = document.getElementById('newyear-countdown');

// 设置圣诞节和跨年的时间
const christmasEventDate = new Date("2024-12-25T00:00:00");
const newYearEventDate = new Date("2024-12-31T23:59:59");

// 计算并更新倒计时
function updateCountdown() {
    const now = new Date();

    // 圣诞节倒计时
    let christmasDiff = christmasEventDate - now;
    if (christmasDiff > 0) {
        const christmasDays = Math.floor(christmasDiff / (1000 * 60 * 60 * 24));
        const christmasHours = Math.floor((christmasDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const christmasMinutes = Math.floor((christmasDiff % (1000 * 60 * 60)) / (1000 * 60));
        const christmasSeconds = Math.floor((christmasDiff % (1000 * 60)) / 1000);
        christmasCountdown.textContent = `倒计时：${christmasDays}天 ${christmasHours}小时 ${christmasMinutes}分钟 ${christmasSeconds}秒`;
    } else {
        christmasCountdown.textContent = "活动已结束";
    }

    // 跨年倒计时
    let newYearDiff = newYearEventDate - now;
    if (newYearDiff > 0) {
        const newYearDays = Math.floor(newYearDiff / (1000 * 60 * 60 * 24));
        const newYearHours = Math.floor((newYearDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const newYearMinutes = Math.floor((newYearDiff % (1000 * 60 * 60)) / (1000 * 60));
        const newYearSeconds = Math.floor((newYearDiff % (1000 * 60)) / 1000);
        newYearCountdown.textContent = `倒计时：${newYearDays}天 ${newYearHours}小时 ${newYearMinutes}分钟 ${newYearSeconds}秒`;
    } else {
        newYearCountdown.textContent = "活动已结束";
    }
}

// 更新倒计时，每秒钟更新一次
setInterval(updateCountdown, 1000);
updateCountdown();

// 进入活动的功能
function enterEvent(eventName) {
    if (eventName === 'christmas') {
        alert("进入圣诞节活动页面！");
        // 这里可以加入页面跳转代码，比如：window.location.href = "christmas.html";
    } else if (eventName === 'newyear') {
        alert("进入跨年活动页面！");
        // 这里可以加入页面跳转代码，比如：window.location.href = "newyear.html";
    }
}
