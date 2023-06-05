const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const { Pool } = require('pg');
const { getWordRoots, getRelatedWords, addWordRoot, deleteWordRoot, upsertDefinition, deleteWord } = require('./databaseQueries');

const app = express();
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

app.post('/api/get-word-roots', async (request, response) => {
  const client = await pool.connect();
  const result = await client.query(getWordRoots);

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.post('/api/get-related-words', async (request, response) => {
  const { radiko } = request.body;

  const client = await pool.connect();
  const result = await client.query(
    getRelatedWords,
    [
      `${radiko}%`
    ]
  );

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.post('/api/add-word-root', async (request, response) => {
  const { radiko } = request.body;

  const client = await pool.connect();
  try {
    const result = await client.query(
      addWordRoot,
      [
        radiko
      ]
    );
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.post('/api/delete-word-root', async (request, response) => {
  const { radiko } = request.body;

  const client = await pool.connect();
  try {
    const result = await client.query(
      deleteWordRoot,
      [
        radiko
      ]
    );
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.post('/api/upsert-definition', async (request, response) => {
  const { radiko, vorto, difino, bildadreso } = request.body;

  const client = await pool.connect();

  try {
    const result = await client.query(
      upsertDefinition,
      [
        radiko,
        vorto,
        difino,
        bildadreso
      ]
    );
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});


app.post('/api/delete-word', async (request, response) => {
  const { radiko, vorto } = request.body;

  const client = await pool.connect();

  try {
    const result = await client.query(
      deleteWord,
      [
        radiko,
        vorto,
      ]
    );
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});