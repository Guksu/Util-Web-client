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
    color: black;
    background-color: white;
    outline:  ${(props) => props.theme.divOutLineColor};
    border:0;
    border-radius: 1vh ;
    }
    input{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    border-radius: 3vw;
    outline:  ${(props) => props.theme.divOutLineColor};
    height: 25px;
    text-align: center;
    }
    select{
        :focus {
            outline:  #ced4da solid 1px;
        }
    border: 0;
    border-radius: 3vw;
    outline: ${(props) => props.theme.divOutLineColor};
    height: 25px;
    text-align: center;
    }
    option{
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export const CursorDiv = styled.div`
  height: 10px;
  cursor: pointer;
`;
