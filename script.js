// Firebase 配置
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";

// 初始化 Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDvLDPiPQx80t20AJy3C_9iTvT442DNMGo",
    authDomain: "chenyu-harris-project.firebaseapp.com",
    projectId: "chenyu-harris-project",
    storageBucket: "chenyu-harris-project.appspot.com",
    messagingSenderId: "898361483940",
    appId: "1:898361483940:web:d526971519dae0f062bc31"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 打开和关闭模态框
const registerModal = document.getElementById("register-modal");
const loginModal = document.getElementById("login-modal");

document.getElementById("register-btn").addEventListener("click", () => {
    registerModal.style.display = "block";
});
document.getElementById("login-btn").addEventListener("click", () => {
    loginModal.style.display = "block";
});
document.getElementById("register-close").addEventListener("click", () => {
    registerModal.style.display = "none";
});
document.getElementById("login-close").addEventListener("click", () => {
    loginModal.style.display = "none";
});

// 注册功能
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("注册成功，欢迎 " + userCredential.user.email);
        registerModal.style.display = "none";
    } catch (error) {
        alert(`注册失败: ${error.message}`);
    }
});

// 登录功能
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("登录成功，欢迎回来 " + userCredential.user.email);
        loginModal.style.display = "none";
        redirectTo("menu.html");
    } catch (error) {
        document.getElementById("error-message").textContent = `登录失败: ${error.message}`;
    }
});

// 页面跳转功能
function redirectTo(target) {
    window.location.href = target; // 执行跳转
}

// --- 保留的轮播图功能 ---
let currentIndex = 0;
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    carousel.style.transition = "transform 0.5s ease-in-out";
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function showPrevSlide() {
    currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    updateCarousel();
}

prevButton?.addEventListener("click", showPrevSlide);
nextButton?.addEventListener("click", showNextSlide);

let autoSlideInterval = setInterval(showNextSlide, 5000);
carousel?.addEventListener("mouseover", () => clearInterval(autoSlideInterval));
carousel?.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(showNextSlide, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
    updateCarousel();
});
