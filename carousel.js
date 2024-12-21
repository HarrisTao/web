// 获取轮播图的相关元素
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

// 更新轮播显示
function updateCarousel() {
  const offset = -currentIndex * 100; // 根据当前索引移动位置
  carousel.style.transform = `translateX(${offset}%)`;
  carousel.style.transition = "transform 0.5s ease-in-out"; // 平滑过渡
}

// 显示下一张图片
function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides; // 循环切换
  updateCarousel();
}

// 显示上一张图片
function showPrevSlide() {
  currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1; // 循环切换到上一张
  updateCarousel();
}

// 绑定按钮点击事件
prevButton.addEventListener("click", showPrevSlide);
nextButton.addEventListener("click", showNextSlide);

// 自动轮播功能，每 5 秒切换
let autoSlideInterval = setInterval(showNextSlide, 5000);

// 暂停和恢复自动轮播
carousel.addEventListener("mouseover", () => clearInterval(autoSlideInterval));
carousel.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(showNextSlide, 5000);
});

// 初始化轮播状态
document.addEventListener("DOMContentLoaded", () => {
  updateCarousel(); // 初始化显示第一张图片
});
