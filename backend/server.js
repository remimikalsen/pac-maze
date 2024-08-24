const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const dbPath = path.resolve(__dirname, 'data/leaderboard.db');
const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(bodyParser.json());

// Create a table for the leaderboard
db.serialize(() => {
  db.run('CREATE TABLE leaderboard (initials TEXT, time INTEGER)');
});

// Endpoint to submit a score
app.post('/score', (req, res) => {
  const { initials, time } = req.body;
  const stmt = db.prepare('INSERT INTO leaderboard (initials, time) VALUES (?, ?)');
  stmt.run(initials, time, function(err) {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.sendStatus(200);
    }
  });
  stmt.finalize();
});

// Endpoint to get the leaderboard
app.get('/leaderboard', (req, res) => {
  db.all('SELECT * FROM leaderboard ORDER BY time ASC LIMIT 10', [], (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
