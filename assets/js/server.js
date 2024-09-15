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

    if(results.length === 0) {
      console.error("hunger does not exist.")
      return res.status(404).json({error: 'hunger does not exist.'});
    }
    res.json({hunger: results[0].hunger});

  }catch(error) {
    console.error("Database query error:", error)
    res.status(500).json({ error: 'Database query error' });
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



