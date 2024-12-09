import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// 初始化 Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDvLDPiPQx80t20AJy3C_9iTvT442DNMGo",
  authDomain: "chenyu-harris-project.firebaseapp.com",
  projectId: "chenyu-harris-project",
  storageBucket: "chenyu-harris-project.firebasestorage.app",
  messagingSenderId: "898361483940",
  appId: "1:898361483940:web:d526971519dae0f062bc31"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 注册功能
document.getElementById("registerButton").addEventListener("click", async () => {
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: nickname });
        alert("注册成功，请登录！");
    } catch (error) {
        console.error("注册失败：", error.message);
    }
});

// 登录功能
document.getElementById("loginButton").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        alert("登录成功！");
    } catch (error) {
        console.error("登录失败：", error.message);
    }
});

// 用户状态监听
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("用户已登录：", user.displayName || user.email);
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("suggestions").style.display = "block";
    } else {
        document.getElementById("register").style.display = "block";
        document.getElementById("login").style.display = "block";
        document.getElementById("suggestions").style.display = "none";
    }
});

// 提交建议功能
document.getElementById("submitSuggestion").addEventListener("click", async () => {
    const suggestion = document.getElementById("suggestionInput").value;

    if (!suggestion) {
        alert("请输入建议！");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        alert("请先登录！");
        return;
    }

    try {
        await addDoc(collection(db, "suggestions"), {
            nickname: user.displayName || "匿名用户",
            suggestion,
            createdAt: serverTimestamp()
        });
        alert("建议已提交！");
        document.getElementById("suggestionInput").value = "";
    } catch (error) {
        console.error("提交建议失败：", error.message);
    }
});

// 登出功能
document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("已登出！");
    } catch (error) {
        console.error("登出失败：", error.message);
    }
});
