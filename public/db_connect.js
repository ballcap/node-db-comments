const apiUrl = 'https://node-db-comments.onrender.com/comments';

// Fetch comments
async function fetchComments() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const comments = await response.json();
        if (!Array.isArray(comments)) {
            throw new Error('Response is not an array');
        }

        comments.forEach(comment => {
            console.log(comment);
        });
    } catch (error) {
        console.error('Error fetching comments:', error.message);
    }
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
