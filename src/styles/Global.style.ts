import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  input {
    outline: none;
    margin: 0;
  }

  button {
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0; 
    border: none;
  }

  svg, image, video {
    vertical-align: top;
  }
`;
