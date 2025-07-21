const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Helper to read/write db.json
const DB_PATH = path.join(__dirname, 'db.json');
function readData() {
  const raw = fs.readFileSync(DB_PATH);
  return JSON.parse(raw);
}
function writeData(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// CRUD endpoints
app.get('/goals', (req, res) => {
  const { goals } = readData();
  res.json(goals);
});

app.post('/goals', (req, res) => {
  const data = readData();
  const newGoal = { id: Date.now(), ...req.body };
  data.goals.push(newGoal);
  writeData(data);
  res.status(201).json(newGoal);
});

app.patch('/goals/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const goal = data.goals.find(g => g.id === id);
  if (!goal) return res.status(404).json({ error: 'Not found' });
  Object.assign(goal, req.body);
  writeData(data);
  res.json(goal);
});

app.delete('/goals/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  data.goals = data.goals.filter(g => g.id !== id);
  writeData(data);
  res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
