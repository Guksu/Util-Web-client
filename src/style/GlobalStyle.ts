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
    color: #fff;
    background-color: #999999;
    border:0
    }
    input{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    outline: #ced4da solid 1px;
    }
    select{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    outline: #ced4da solid 1px;
    }
    option{
        font-family: 'Gowun Batang', serif;
    }
`;

export const CursorDiv = styled.div`
  cursor: pointer;
`;
