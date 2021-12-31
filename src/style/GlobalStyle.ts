import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Batang', serif;}
    ::placeholder {
    font-family: 'Gowun Batang', serif;
    text-align: center;
    }
    button{
    font-family: 'Gowun Batang', serif;
    text-align: center;
    }
`;

export default GlobalStyles;
