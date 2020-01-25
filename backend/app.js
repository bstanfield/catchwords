const express = require('express');
const app = express();
const R = require('ramda');
const port = 3333;
const { getRandomWords } = require('./queries');

var pgp = require('pg-promise');
const db = require('./queries');
const bodyParser = require('body-parser');

// bodyParser middleware to help parse JSON
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const genericEndpoint = R.curry(
  (appToUse, requestType, filenameAndURL, exportName) => {
    appToUse[requestType](
      `/api/${filenameAndURL}`,
      require(`./endpoints/${filenameAndURL}`)[exportName]
    );
  }
);
const addEndpoint = genericEndpoint(app);

// Confirms server is running in console
app.listen(port, () => console.log(`Listening on port ${port}`));

// // Use this endpoint to get all persona names and characteristics
// app.get('/personas', db.getPersonas);

// // Use this endpoint to get all persona-specific recipes
// app.get('/persona_recipes/:personaId', db.getPersonaSpecificRecipes);

// // Use this endpoint to get all recipe names
// app.get('/recipenames', db.getRecipeNames);

// // This might not be useful
// app.get('/ingredients/:id', db.getRecipeIngredients);

// // Use this endpoint for primary recipe page
// app.get('/survey_results/:cost/:cookTime/:restriction', db.getSurveyResults);

// // Use this endpoint for primary recipe page
// app.get('/master_recipes/:name', db.getMasterRecipe)

// Standard messages
app.get('/', (req, res) => {
    res.json({ info: 'Hello catchword!' })
});

// Get words
app.get('/words', db.getWords);

app.get('/free-board', async () => {
  const words = await getRandomWords();
  const wordsArr = R.pluck('name', words.rows);
  res.status(200).send({ board: wordsArr });
});

addEndpoint('post', 'add-word', 'addWord');

addEndpoint('post', 'generate-board', 'generateBoard');