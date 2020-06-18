module.exports = {
  parser: 'babel-eslint', // alows jsx parsing for free
  env: {
    browser: true,
    node: true // Support for process env variables
  },
  extends: [
    'plugin:prettier/recommended',
    'problems', // no formatting, just code problems
  ],
  plugins: ['react'],
  rules: {
    // <Component /> marks Component as used
    "react/jsx-uses-vars": 2,

    // @jsx pragma support
    "react/jsx-uses-react": 2,

    // Error when you try to render a thing without @jsx in scope
    "react/react-in-jsx-scope": 2,

    // there are too many of these
    "no-unused-vars": 1
  },
}
