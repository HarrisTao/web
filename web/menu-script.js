document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('about-btn').addEventListener('click', () => {
        window.location.href = 'about.html';  // 跳轉至關於我們頁面
    });

    document.getElementById('events-btn').addEventListener('click', () => {
        window.location.href = 'events.html';  // 跳轉至活動頁面
    });

    document.getElementById('suggestions-btn').addEventListener('click', () => {
        window.location.href = 'suggestions.html';  // 跳轉至建議頁面
    });

    document.getElementById('news-btn').addEventListener('click', () => {
        window.location.href = 'news.html';  // 跳轉至消息頁面
    });
});
