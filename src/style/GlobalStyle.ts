import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Noto Sans KR', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    }
    ::placeholder {
        font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
    color: black;
    }
    button{
        font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: #999999 ;
    border:0;
    border-radius: 10px ;
    }
    input{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    border-radius: 30px;
    outline:  ${(props) => props.theme.divOutLineColor};
    height: 25px;
    text-align: center;
    }
    select{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    outline: #ced4da solid 1px;
    }
    option{
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export const CursorDiv = styled.div`
  cursor: pointer;
`;
