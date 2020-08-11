import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Fira Sans', sans-serif, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Fira Sans', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
