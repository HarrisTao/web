// 引入 Firebase 配置和功能模块
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDvLDPiPQx80t20AJy3C_9iTvT442DNMGo",
  authDomain: "chenyu-harris-project.firebaseapp.com",
  projectId: "chenyu-harris-project",
  storageBucket: "chenyu-harris-project.firebasestorage.app",
  messagingSenderId: "898361483940",
  appId: "1:898361483940:web:d526971519dae0f062bc31",
};

// 初始化 Firebase 和 Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 页面元素
const suggestionForm = document.getElementById("suggestion-form");
const suggestionText = document.getElementById("suggestion-text");
const suggestionsContainer = document.getElementById("suggestions-container");

// 当前用户
let currentUser = null;

// 用户身份验证状态监听
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("用户已登录:", user.displayName || user.email);
    loadSuggestions(); // 用户登录后加载建议
  } else {
    currentUser = null;
    alert("请先登录！");
    window.location.href = "index.html"; // 重定向到登录页
  }
});

// 加载和监听所有建议
function loadSuggestions() {
  const q = query(collection(db, "suggestions"), orderBy("timestamp", "desc"));

  // 使用 onSnapshot 实现实时监听
  onSnapshot(
    q,
    (snapshot) => {
      suggestionsContainer.innerHTML = ""; // 清空列表
      if (snapshot.empty) {
        suggestionsContainer.innerHTML = "<p>暂无建议。</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const suggestion = doc.data();
        const suggestionDiv = document.createElement("div");
        suggestionDiv.classList.add("suggestion-item");

        suggestionDiv.innerHTML = `
          <div class="user-info">
            ${suggestion.nickname || "匿名用户"} - ${new Date(
          suggestion.timestamp?.toDate() || Date.now()
        ).toLocaleString()}
          </div>
          <div class="suggestion-text">${suggestion.text || "无内容"}</div>
          ${
            suggestion.userId === currentUser?.uid
              ? `<button onclick="deleteSuggestion('${doc.id}')">撤回</button>`
              : ""
          }
        `;
        suggestionsContainer.appendChild(suggestionDiv);
      });
    },
    (error) => {
      console.error("加载建议失败：", error);
      suggestionsContainer.innerHTML = "<p>加载建议时出现问题，请稍后重试。</p>";
    }
  );
}

// 提交建议
suggestionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("请先登录！");
    return;
  }

  const suggestionContent = suggestionText.value.trim();
  if (!suggestionContent) {
    alert("建议内容不能为空！");
    return;
  }

  // 禁用提交按钮，防止重复提交
  const submitButton = suggestionForm.querySelector("button[type='submit']");
  submitButton.disabled = true;

  try {
    await addDoc(collection(db, "suggestions"), {
      nickname: auth.currentUser.displayName || "匿名用户", // 从用户信息获取昵称
      text: suggestionContent,
      timestamp: serverTimestamp(),
      userId: auth.currentUser.uid, // 保存用户的 UID
    });
    alert("建议提交成功！");
    suggestionText.value = ""; // 清空输入框
  } catch (error) {
    console.error("提交建议失败：", error);
    alert("提交建议失败，请稍后再试。");
  } finally {
    submitButton.disabled = false; // 启用按钮
  }
});

// 删除建议
window.deleteSuggestion = async (id) => {
  const confirmDelete = confirm("确定要撤回该建议吗？");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "suggestions", id));
    alert("建议已撤回！");
  } catch (error) {
    console.error("撤回建议失败：", error);
    alert("撤回建议失败，请稍后再试。");
  }
};

// 页面加载时初始化建议列表
document.addEventListener("DOMContentLoaded", loadSuggestions);
