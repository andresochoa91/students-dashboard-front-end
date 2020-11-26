import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0px;
    padding: 0px;
    box-sizing: inherit;
  }
  html {
    font-size: 1rem;
  }
  body {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;
export default GlobalStyles;
