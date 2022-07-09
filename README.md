# catchwords

### DB setup
This app requires a connection to a local database to run locally. Here's how to
set up your own local psql database:

1. navigate to the backend folder and run `npm install`

2. create an empty postgres database from the commandline by typing
   `psql postgres` followed by `CREATE DATABASE catchwords;`

3. copy the file `.env.sample` like this: `cp .env.sample .env` and
   replace YOUR_USERNAME and YOUR_DATABASE_NAME

4. run `npm run migrate` and inspect the contents of your local
   database. you should see 4 tables: migrations, passwords, boards, and
   words.

5. Seed the database with a set of ~700 words by running `npm run seed`

6. You need a default password:
   ```sql
   insert into passwords(password) values('somepig');
   ```

### Deployment
#### Backend
Catchwords' server is hosted for $7/mo. on Heroku, along with the Postgres DB. New deployments are triggered via pushes to the `master` branch of the `catchwords` github repo.

#### Frontend
Catchwords' frontend is hosted for free on Vercel under the project name `catchwords-frontend`. New deployments are triggered by entering the /frontend folder and typing `vercel`.


