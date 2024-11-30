// 控制轮播滑动
let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-item'); // 获取所有的图片元素
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// 更新轮播显示
function updateCarousel() {
    const offset = -currentIndex * 100; // 每次移动一个完整的宽度
    carousel.style.transform = `translateX(${offset}%)`;
    carousel.style.transition = 'transform 0.5s ease-in-out'; // 添加平滑过渡效果
}

// 显示下一张图片
function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // 循环切换
    updateCarousel();
}

// 显示上一张图片
function showPrevSlide() {
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1; // 循环切换到上一张
    updateCarousel();
}

// 绑定按钮点击事件
if (prevButton) {
    prevButton.addEventListener('click', showPrevSlide);
}
if (nextButton) {
    nextButton.addEventListener('click', showNextSlide);
}

// 初始化轮播状态
document.addEventListener('DOMContentLoaded', function () {
    updateCarousel(); // 初始化显示第一张图片
});

// 自动轮播功能，每 5 秒切换
let autoSlideInterval = setInterval(showNextSlide, 5000);

// 暂停和恢复自动轮播
if (carousel) {
    carousel.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(showNextSlide, 5000);
    });
}

// 登录功能
document.getElementById('enter-btn')?.addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const password = passwordInput?.value || '';
    const errorMessage = document.getElementById('error-message');

    const correctPassword = '0227'; // 设置密码

    if (password === correctPassword) {
        window.location.href = 'menu.html'; // 密码正确，跳转至菜单页
    } else {
        errorMessage.textContent = '密码错误，请重新输入！'; // 密码错误，显示提示信息
        errorMessage.style.color = 'red'; // 提示信息显示为红色
        errorMessage.style.marginTop = '10px';
        passwordInput?.focus(); // 将焦点返回到输入框
    }
});

// 动态显示/隐藏公告功能
document.getElementById('toggle-btn')?.addEventListener('click', function () {
    const announcementSection = document.querySelector('.announcement');
    if (announcementSection) {
        const isHidden = announcementSection.style.display === 'none';
        announcementSection.style.display = isHidden ? 'block' : 'none';
        this.textContent = isHidden ? '隐藏公告' : '显示公告'; // 按钮文字随状态切换
    }
});
