import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  *, html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Roboto', sans-serif;  
  }
  `;
