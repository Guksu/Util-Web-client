import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AccountChart from "../../components/AccountComponents/AccountChart";
import { CREATE_ACCOUNT } from "../../gql/mutation";
import { CreateAccountIF } from "../../interfaces/AccountIF";

const AccountWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 50%));
  width: 90vw;
  margin: auto;
  margin-top: 5%;
  border-radius: 50px;
  outline: ${(props) => props.theme.divOutLineColor};
  box-shadow: 0 0 5px black;
  @media (max-width: 760px) {
    width: 1fr;
    margin-bottom: 5%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  @media (max-width: 335px) {
    width: 320px;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`;

const AccountInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  margin: auto;
  @media (max-width: 1024px) {
    width: 280px;
  }
`;

const AccountBtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AccountBtn = styled.button`
  width: 8vw;
  font-size: 15px;
  @media (max-width: 1024px) {
    width: 120px;
  }
`;

function Account() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const history = useHistory();
  const [createAccount] = useMutation<CreateAccountIF>(CREATE_ACCOUNT, {
    variables: {
      createAccountInput: {
        date,
        type,
        category,
        amount: parseInt(amount.replace(/,/g, "")),
      },
    },
  });

  // 인풋값 콤마 적용

  const changNum: React.FormEventHandler<HTMLInputElement> = (e) => {
    const i = e.currentTarget;
    const startPosition = i.value.length - i.selectionEnd!;
    i.value = i.value
      .replace(/^0+|\D+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    const len = Math.max(i.value.length - startPosition, 0);
    i.setSelectionRange(len, len);
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const { data } = await createAccount();
      if (data?.createAccount.ok) {
        alert("저장되었습니다");
        window.location.reload();
      } else {
        alert(data?.createAccount.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AccountWrapper>
        <AccountChart />
        <AccountInputDiv>
          <input
            style={{ marginBottom: "8%" }}
            type={"date"}
            required
            name="date"
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
          />
          <select
            style={{ marginBottom: "8%" }}
            name="typeSelect"
            onChange={(e) => {
              setType(e.currentTarget.value);
            }}
            required
          >
            <option value={""}>수입 / 지출 선택</option>
            <option value={"profit"}>수입</option>
            <option value={"expense"}>지출</option>
          </select>
          {type === "profit" && (
            <select
              style={{ marginBottom: "8%" }}
              name="profitCategory"
              required
              onChange={(e) => {
                setCategory(e.currentTarget.value);
              }}
            >
              <option value={""}>카테고리를 선택하세요</option>
              <option value={"급여"}>급여</option>
              <option value={"투자"}>투자</option>
              <option value={"기타등등"}>기타등등</option>
            </select>
          )}
          {type === "expense" && (
            <select
              style={{ marginBottom: "8%" }}
              name="expenseCategory"
              required
              onChange={(e) => {
                setCategory(e.currentTarget.value);
              }}
            >
              <option value={""}>카테고리를 선택하세요</option>
              <option value={"식비"}>식비</option>
              <option value={"의류비"}>의류비</option>
              <option value={"교통비"}>교통비</option>
              <option value={"세금"}>세금</option>
              <option value={"유흥비"}>유흥비</option>
              <option value={"기타등등"}>기타등등</option>
            </select>
          )}
          <input
            style={{ marginBottom: "8%" }}
            type={"text"}
            placeholder="금액을 입력하세요"
            required
            name={"amount"}
            onChange={(e) => {
              setAmount(e.currentTarget.value);
            }}
            onInput={changNum}
          />
          <AccountBtnDiv>
            <AccountBtn onClick={onClick}>저장하기</AccountBtn>
            <AccountBtn
              onClick={() => {
                history.push("/account/detail");
              }}
            >
              상세내역 이동
            </AccountBtn>
          </AccountBtnDiv>
        </AccountInputDiv>
      </AccountWrapper>
    </>
  );
}

export default Account;
