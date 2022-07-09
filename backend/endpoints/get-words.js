const fs = require('fs');
const { getValidWords } = require("../db");

exports.getWords = async (req, res) => {
  const words = await getValidWords();
  res.status(200).send({ words });
};