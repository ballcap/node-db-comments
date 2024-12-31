const apiUrl = 'https://node-db-comments.onrender.com/comments';

// Fetch comments
async function fetchComments() {
    const response = await fetch(apiUrl);
    const comments = await response.json();
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.textContent = `${comment.commentname} (${new Date(comment.commentdate).toLocaleString()})`;
        commentList.appendChild(div);
    });
}

// Add a new comment
document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentname = document.getElementById('commentname').value;
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentname }),
    });
    document.getElementById('commentname').value = '';
    fetchComments();
});

fetchComments(); // Load comments on page load
