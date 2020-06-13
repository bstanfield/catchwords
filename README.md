# catchwords

This app requires a connection to a local database to run. Here's how to set up your own local psql database:

1. navigate to the backend folder and run `npm install`
2. create an empty postgres database from the commandline by typing `psql` followed by `CREATE DATABASE db_name;`
3. copy the file `.env.sample` like this: `cp .env.sample .env` and replace YOUR_USERNAME and YOUR_DATABASE_NAME
4. run `npm run migrate` and inspect the contents of your local database. you should see 4 tables: migrations, passwords, boards, and words.
5. Seed the database with a set of ~700 words by running `npm run seed`
