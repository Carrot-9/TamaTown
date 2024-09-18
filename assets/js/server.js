const express = require('express'); 
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(express.json());

app.use(cors());

app.get('/api/hunger/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT hunger FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({hunger: results[0].hunger});
  }catch(error) {
    console.error("Error Retreiving 'hunger':", error);
    res.status(500).json({ error: "Error Retreiving 'hunger':"});
  }
});

app.get('/api/health/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT health FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({health: results[0].health});
  }catch(error) {
    console.error("Error Retreiving 'health':", error);
    res.status(500).json({ error: "Error Retreiving 'health':"});
  }
});

app.get('/api/happiness/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT happiness_level FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({happiness_level: results[0].happiness_level});
  }catch(error) {
    console.error("Error Retreiving 'happiness_level':", error);
    res.status(500).json({ error: "Error Retreiving 'happiness_level':"});
  }
});

app.get('/api/friendship/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT friendship_level FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({friendship_level: results[0].friendship_level});
  }catch(error) {
    console.error("Error Retreiving 'friendship_level':", error);
    res.status(500).json({ error: "Error Retreiving 'friendship_level':"});
  }
});

app.get('/api/age/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT age FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({age: results[0].age});
  }catch(error) {
    console.error("Error Retreiving 'age':", error);
    res.status(500).json({ error: "Error Retreiving 'age':"});
  }
});

app.get('/api/weight/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT weight FROM tamagotchi_stats WHERE id = ?', [id]);
    res.json({weight: results[0].weight});
  }catch(error) {
    console.error("Error Retreiving 'weight':", error);
    res.status(500).json({ error: "Error Retreiving 'weight':"});
  }
});

app.listen(
  PORT, 
  () => console.log(`Server is Running On http://localhost:${PORT}`)
)

const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'tamagotchidb'
}).promise();

db.connect((error) => {
  if (error) throw error; 
  console.log('MySQL connected');
});

async function ShowStats() {
  try {
const [rows] = await db.query("SELECT * FROM tamagotchi_stats");
console.log(rows);
return rows; 
  } catch(error) {
    console.error("An Error occured:", error);
  }
  }

  (async () => {
 await ShowStats();
  })().catch(err => {
    console.error("Error has occured:", err)
  });



