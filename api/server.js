const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const { Pool } = require('pg');
const { getWords, getWord, upsertWord } = require('./databaseQueries');

const app = express();
const dbUrl = process.env.REACT_APP_FACILA_VORTARO_POSTGRES_URL;
const port = process.env.PORT ?? 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.FACILA_VORTARO_DATABASE_USER,
  password: process.env.FACILA_VORTARO_DATABASE_PASSWORD,
  database: process.env.FACILA_VORTARO_DATABASE_NAME,
  port: 5432,
  host: process.env.FACILA_VORTARO_DATABASE_HOST,
  pool: {
    min: 1,
    max: 2,
    idleTimeoutMillis: 5000
  },
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  next();
})

app.options('*', (request, response) => {
  response.sendStatus(200);
});

app.post('/api/get-word-bases', async (request, response) => {
  const client = await pool.connect();
  const result = await client.query(getWords);

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.get('/api/get-word-base', async (request, response) => {
  const { vorto } = req.query;

  const client = await pool.connect();
  const result = await client.query(
    getWord,
    { params: [`${vorto}%`] }
  );

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.post('/api/upsert-word-base', async (request, response) => {
  const { vorto, bildadreso } = req.query;

  const client = await pool.connect();
  const result = await client.query(
    getWord,
    { params: [vorto, bildadreso] }
  );

  response.status(200);
  client.release();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});