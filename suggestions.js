// Firebase 配置（用您自己的 Firebase 配置信息）
var firebaseConfig = {
  apiKey: "your-api-key", // 替换为你的 Firebase apiKey
  authDomain: "your-project-id.firebaseapp.com", // 替换为你的 Firebase authDomain
  projectId: "your-project-id", // 替换为你的 Firebase projectId
  storageBucket: "your-project-id.appspot.com", // 替换为你的 Firebase storageBucket
  messagingSenderId: "your-messaging-sender-id", // 替换为你的 Firebase messagingSenderId
  appId: "your-app-id" // 替换为你的 Firebase appId
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 提交建议
document.getElementById('suggestion-form').addEventListener('submit', function (e) {
  e.preventDefault(); // 防止表单默认提交

  const suggestionText = document.getElementById('suggestion-text').value.trim();
  if (suggestionText === '') {
    alert('请输入建议');
    return;
  }

  // 将建议保存到 Firebase
  db.collection('suggestions').add({
    text: suggestionText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    user: 'User' // 可以根据需要调整用户信息，若有用户登录系统时，可存储用户名
  }).then(() => {
    document.getElementById('suggestion-text').value = ''; // 清空输入框
    loadSuggestions();  // 重新加载建议列表
  }).catch(error => {
    console.error('Error adding suggestion: ', error);
  });
});

// 加载所有建议
function loadSuggestions() {
  db.collection('suggestions').orderBy('timestamp', 'desc').get()
    .then(snapshot => {
      const suggestionsContainer = document.getElementById('suggestions-container');
      suggestionsContainer.innerHTML = '';  // 清空现有的建议内容

      snapshot.forEach(doc => {
        const data = doc.data();
        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('suggestion');
        
        suggestionDiv.innerHTML = `
          <p>${data.text}</p>
          <p><small>发表于: ${data.timestamp.toDate().toLocaleString()}</small></p>
          <button onclick="deleteSuggestion('${doc.id}')">删除</button>
        `;
        suggestionsContainer.appendChild(suggestionDiv);
      });
    }).catch(error => {
      console.error('Error loading suggestions: ', error);
    });
}

// 删除建议
function deleteSuggestion(suggestionId) {
  db.collection('suggestions').doc(suggestionId).delete()
    .then(() => {
      alert('建议已删除');
      loadSuggestions();  // 重新加载建议列表
    }).catch(error => {
      console.error('Error deleting suggestion: ', error);
    });
}

// 初始化加载建议
document.addEventListener('DOMContentLoaded', function () {
  loadSuggestions(); // 页面加载时加载所有建议
});
