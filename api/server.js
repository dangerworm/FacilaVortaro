const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');

const { Pool } = require('pg');
const {
  getWordList,
  getWordRootList,
  getWordRoot,
  addWordRoot,
  addWordRootWord,
  updateWordRoot,
  deleteWordRoot,
  getRelatedWords,
  upsertWord,
  moveWord,
  moveImage,
  deleteWord,
  getImages,
  upsertImage,
  deleteRemainingImages,
} = require('./databaseQueries');

const app = express();
const port = process.env.PORT ?? 5000;

/*
// Localhost against Docker container
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  port: 5432,
  host: 'localhost',
  pool: {
    min: 1,
    max: 2,
    idleTimeoutMillis: 5000
  }
});
/*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  pool: {
    min: 1,
    max: 2,
    idleTimeoutMillis: 5000
  },
  ssl: {
    rejectUnauthorized: false
  }
});
//*/

app.use(cors());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
})

const cleanUpWordRoot = async (client, kapvorto) => {
  const result = await client.query(getRelatedWords, [kapvorto]);

  if (result.rows.length === 0) {
    await client.query(deleteWordRoot, [kapvorto]);
  }
}

app.options('*', (request, response) => {
  response.sendStatus(200);
});

app.post('/api/get-word-root-list', async (request, response) => {
  const client = await pool.connect();
  const result = await client.query(getWordRootList);

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.post('/api/get-word-list', async (request, response) => {
  const client = await pool.connect();
  const result = await client.query(getWordList);

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.post('/api/add-word-root', async (request, response) => {
  const { kapvorto } = request.body;

  const client = await pool.connect();
  let result;

  try {
    result = await client.query(getWordRoot, [kapvorto]);
  }
  catch (error) {
    response.status(500).json(error);
    client.release();

    return;
  }

  try {
    if (result.rows.length === 0) {
      result = await client.query(addWordRoot, [kapvorto]);
      result = await client.query(addWordRootWord, [kapvorto]);
    }
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.post('/api/update-word-root', async (request, response) => {
  const { malnovaKapvorto, novaKapvorto } = request.body;

  const client = await pool.connect();
  let result;

  try {
    result = await client.query(updateWordRoot, [malnovaKapvorto, novaKapvorto]);

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
  const { kapvorto } = request.body;

  const client = await pool.connect();
  try {
    const result = await client.query(deleteWordRoot, [kapvorto]);
    response.status(200).json(result);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.post('/api/get-related-words', async (request, response) => {
  const { kapvorto } = request.body;

  const client = await pool.connect();
  const result = await client.query(getRelatedWords, [kapvorto]);

  if (result.rows) {
    for (let row of result.rows) {
      const imagesResult = await client.query(
        getImages,
        [
          row.kapvorto,
          row.vorto
        ]
      );

      row.images = imagesResult.rows.map(image => {
        return {
          kapvorto: image.kapvorto,
          vorto: image.vorto,
          indekso: image.indekso,
          bilddatumo: image.bilddatumo,
          mimetipo: image.mimetipo,
          bildadreso: image.bildadreso,
          atribuo: image.atribuo,
          larĝo: image.larĝo
        }
      });
    }
  }

  response.json(result.rows);
  client.release();
});

app.post('/api/upsert-word', async (request, response) => {
  const { kapvorto, vorto, difino, images } = request.body;

  const client = await pool.connect();

  try {
    const result = await client.query(upsertWord, [kapvorto, vorto, difino]);

    if (images) {
      for (const image of images) {
        const { indekso, bilddatumo, mimetipo, bildadreso, atribuo, larĝo } = image;
        await client.query(
          upsertImage,
          [
            kapvorto,
            vorto,
            indekso,
            bilddatumo,
            mimetipo,
            bildadreso,
            atribuo,
            larĝo
          ]
        );
      }
    }

    await client.query(
      deleteRemainingImages,
      [
        kapvorto,
        vorto,
        images?.length ?? 0
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

app.post('/api/move-word', async (request, response) => {
  const { vorto, malnovaKapvorto, novaKapvorto } = request.body;

  const client = await pool.connect();

  try {
    let result = await client.query(moveWord, [vorto, malnovaKapvorto, novaKapvorto]);
    result = await client.query(moveImage, [vorto, malnovaKapvorto, novaKapvorto]);
    cleanUpWordRoot(client, malnovaKapvorto);

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
  const { kapvorto, vorto } = request.body;

  const client = await pool.connect();

  try {
    const actionResult = await client.query(deleteWord, [kapvorto, vorto]);
    cleanUpWordRoot(client, kapvorto);

    response.status(200).json(actionResult);
  }
  catch (error) {
    response.status(500).json(error);
  }
  finally {
    client.release();
  }
});

app.post('/api/get-images', async (request, response) => {
  const { kapvorto, vorto } = request.body;

  const client = await pool.connect();
  const result = await client.query(getImages, [kapvorto, vorto]);

  const rows = result.rows;
  response.json(rows);
  client.release();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});