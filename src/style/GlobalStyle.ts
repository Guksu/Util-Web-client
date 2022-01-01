import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Batang', serif;}
    ::placeholder {
    font-family: 'Gowun Batang', serif;
    text-align: center;
    background-color:#dee2e6;
    }
    button{
    font-family: 'Gowun Batang', serif;
    text-align: center;
    }
    input{
        :focus {
            outline: 0;
        }
    border: 0;
    border-bottom: 1px solid black;
    }
`;

export default GlobalStyles;
