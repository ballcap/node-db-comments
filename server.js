const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Database connection
const pool = new Pool({
    connectionString: 'postgresql://postgres_85sq_user:LdYres2nwYcivLGehN70nzNuIivCvaV8@dpg-ctq0dd3tq21c739s7ovg-a.singapore-postgres.render.com/postgres_85sq',
    ssl: { rejectUnauthorized: false }, // Render requires SSL
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public folder

// GET /comments - Fetch all comments
app.get('/comments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comment'); // Adjust table name/structure if needed
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /comments - Add a new comment
app.post('/comments', async (req, res) => {
    const { commentname } = req.body;

    if (!commentname) {
        return res.status(400).json({ error: 'Comment name is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO comment (commentname, commentdate) VALUES ($1, NOW()) RETURNING *',
            [commentname]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});