import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Batang', serif;}
    ::placeholder {
    font-family: 'Gowun Batang', serif;
    text-align: center;
    }
    button{
    font-family: 'Gowun Batang', serif;
    text-align: center;
    cursor: pointer;
    }
    input{
        :focus {
            outline:  #dee2e6 solid 1px;
        }
    border: 0;
    border-bottom: 1px solid black;
    outline: #dee2e6 solid 1px;
    }

`;

export const CursorDiv = styled.div`
  cursor: pointer;
`;
