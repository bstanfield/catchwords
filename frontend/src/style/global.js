import { css } from '@emotion/react';

export default css`
html,
body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body {
  position: relative;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.highlighted {
  z-index: 10000 !important;
}

:root {
  --text-dark: #333333;
  --text-light: white;

  --background: #eeeeee;
  --background-emphasis: white;
  --text-primary: #333333;
  --text-secondary: #777777;
  --border: #cccccc;
  --box-shadow: #dddddd;

  --button-simple: #dedede;
  --button-simple-hover: #dddddd;
  --button-simple-select: #75aafa;
  --button-green: #4dc156;
  --card-neutral: transparent;
  --card-default: white;
  --card-correct: #B7F4A9;
  --card-assassin: #FF9F9F;
}

html[data-theme="purple"] {
  --text-dark: #333333;
  --text-light: white;

  --background: lavender;
  --background-emphasis: #d1d1ff;
  --text-primary: #391778;
  --text-secondary: #5e3f96;
  --border: #696178;
  --box-shadow: lavender;

  --button-simple: #d1d1ff;
  --button-simple-hover: #d1d1ff;
  --button-simple-select: #b08df0;
  --button-green: #4dc156;
  --card-neutral: transparent;
  --card-default: white;
  --card-correct: #75e6b5;
  --card-assassin: #ed7ee9;
}


html[data-theme="neon"] {
  --text-dark: #333333;
  --text-light: white;

  --background: yellow;
  --background-emphasis: gold;
  --text-primary: #0049c7;
  --text-secondary: dodgerblue;
  --border: aqua;
  --box-shadow: aqua;

  --button-simple: gold;
  --button-simple-hover: #e0c007;
  --button-simple-select: #ffe342;
  --button-green: #4dc156;
  --card-neutral: transparent;
  --card-default: white;
  --card-correct: #c3ff00;
  --card-assassin: #fc4dff;
}

html[data-theme="dark"] {
  --text-dark: #333333;
  --text-light: white;

  --background: #222222;
  --background-emphasis: #000000;
  --text-primary: white;
  --text-secondary: #cccccc;
  --border: #666666;
  --box-shadow: #555555;

  --button-simple: #444444;
  --button-simple-hover: #666666;
  --button-simple-select: #3a7de0;
  --button-green: #4dc156;
  --card-default: #343434;
  --card-neutral: #343434;
  --card-correct: #067d2e;
  --card-assassin: #871003;
}
`