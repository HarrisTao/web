document.addEventListener("DOMContentLoaded", () => {
  const christmasEventTime = new Date("2024-12-24T18:00:00").getTime();
  const newYearEventTime = new Date("2024-12-31T23:59:59").getTime();

  updateCountdown("christmas-countdown", christmasEventTime);
  updateCountdown("newyear-countdown", newYearEventTime);

  setInterval(() => {
    updateCountdown("christmas-countdown", christmasEventTime);
    updateCountdown("newyear-countdown", newYearEventTime);
  }, 1000);
});

function updateCountdown(elementId, eventTime) {
  const now = new Date().getTime();
  const timeDiff = eventTime - now;

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById(elementId).textContent = 
      `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  } else {
    document.getElementById(elementId).textContent = "已开始！";
  }
}

function redirectTo(target) {
  window.location.href = target;
}
