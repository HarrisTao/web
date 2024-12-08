// 引入 Firebase 配置和认证功能
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDvLDPiPQx80t20AJy3C_9iTvT442DNMGo",
    authDomain: "chenyu-harris-project.firebaseapp.com",
    projectId: "chenyu-harris-project",
    storageBucket: "chenyu-harris-project.appspot.com",
    messagingSenderId: "898361483940",
    appId: "1:898361483940:web:d526971519dae0f062bc31"
};

// 初始化 Firebase
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

// 新增取消按钮事件监听
document.getElementById("register-cancel").addEventListener("click", () => {
    registerModal.style.display = "none"; // 关闭注册模态框
});
document.getElementById("login-cancel").addEventListener("click", () => {
    loginModal.style.display = "none"; // 关闭登录模态框
});

// 注册功能
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const nickname = document.getElementById("register-nickname").value.trim();

    if (!email || !password || !nickname) {
        alert("所有字段均为必填！");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: nickname });
        alert(`注册成功，欢迎 ${nickname}`);
        registerModal.style.display = "none";
    } catch (error) {
        alert(`注册失败: ${error.message}`);
    }
});

// 登录功能
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        document.getElementById("error-message").textContent = "请输入有效的用户名和密码！";
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("登录成功，欢迎回来 " + (userCredential.user.displayName || userCredential.user.email));
        loginModal.style.display = "none";
        redirectTo("menu.html"); // 跳转到菜单页面
    } catch (error) {
        document.getElementById("error-message").textContent = `登录失败: ${error.message}`;
    }
});

// 页面跳转功能
function redirectTo(target) {
    window.location.href = target;
}
