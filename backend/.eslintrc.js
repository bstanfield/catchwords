
module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true
  },
  extends: [
    'plugin:prettier/recommended',
    'problems', // no formatting, just code problems
  ],
  rules: {
    // there are too many of these
    "no-unused-vars": 0
  },
}