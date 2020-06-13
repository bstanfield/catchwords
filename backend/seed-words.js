const csv = require('csv-parser');
require('dotenv').config();
const fs = require('fs');
const knex = require('knex')({
  client: 'pg',
  asyncStackTraces: true,
  connection: {
    host: '127.0.0.1',
    user: 'ben',
    password: '',
    database: process.env.DATABASE,
    port: 5432,
  }
});

fs.createReadStream('./words.csv')
  .pipe(csv())
  .on('data', async (row) => {
    console.log(`Reading ${row.name} into DB`);
    await knex.insert({ name: row.name }).into('words');
  })
  .on('end', () => {
    console.log('Seeding complete!');
  });