import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Dodum', sans-serif;}
    ::placeholder {
    font-family:'Gowun Dodum', sans-serif;
    text-align: center;
    }
    button{
    font-family: 'Gowun Dodum', sans-serif;
    text-align: center;
    }
`;

export default GlobalStyles;
