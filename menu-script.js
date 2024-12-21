// 確保 JavaScript 加載成功後執行
document.addEventListener('DOMContentLoaded', () => {
    // 綁定按鈕事件
    document.getElementById('about-btn')?.addEventListener('click', () => {
        window.location.href = 'about.html'; // 跳轉到 "關於我們" 頁面
    });

    document.getElementById('events-btn')?.addEventListener('click', () => {
        window.location.href = 'events.html'; // 跳轉到 "活動" 頁面
    });

    document.getElementById('messages-btn').addEventListener('click', function () {
    console.log("消息按钮被点击");
    window.location.href = 'announcements.html'; // 确保文件路径正确
});



    document.getElementById('suggestions-btn')?.addEventListener('click', () => {
        window.location.href = 'suggestions.html'; // 跳轉到 "建議" 頁面
    });
});
