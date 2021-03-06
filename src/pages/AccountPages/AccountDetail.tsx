import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import DetailLayOut from "../../components/AccountComponents/DetailLayOut";
import { DELETE_ACCOUNT } from "../../gql/mutation";
import { GET_ALL_ACCOUNT_LIST } from "../../gql/query";
import { DeleteAccountIF, GetAccountListIF } from "../../interfaces/AccountIF";

const AccountDetailWrapper = styled.div`
  background-color: ${(props) => props.theme.divBackgroundColor};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 50%));
  width: 90vw;
  margin: auto;
  margin-top: 5%;
  border: 0;
  box-shadow: 0 0 5px black;
  border-radius: 50px;
  outline: ${(props) => props.theme.divOutLineColor};
  @media (max-width: 760px) {
    width: 90vw;
    margin-bottom: 5%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const ListDiv = styled.div`
  display: flex;
  font-size: 110%;
`;

const ListLi = styled.li`
  display: grid;
  width: 40vw;
  grid-template-columns: 30% 70%;
  margin: 2%;
  @media (max-width: 760px) {
    width: 800vw;
  }
  @media (max-width: 404px) {
    font-size: 15px;
  }
  @media (max-width: 347px) {
    font-size: 13px;
  }
`;

const DeleteImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 1%;
`;

function AccountDetail() {
  const { data: getList, refetch } =
    useQuery<GetAccountListIF>(GET_ALL_ACCOUNT_LIST);
  const [deleteAccount] = useMutation<DeleteAccountIF>(DELETE_ACCOUNT);

  //수익리스트
  const profit = getList?.getAccountList.account?.filter(
    (item) => item.type === "profit"
  );

  //지출리스트
  const expense = getList?.getAccountList.account?.filter(
    (item) => item.type === "expense"
  );

  //수익내역
  const profitList = profit?.map((item) => {
    return (
      <ul key={item.accountNo}>
        <ListDiv>
          <ListLi key={item.accountNo}>
            <div>{item.date} </div>
            <div>
              {item.category} : {item.amount.toLocaleString()}원
            </div>
          </ListLi>
          <DeleteImg
            src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/close.png"
            alt="삭제"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const { data: deletData } = await deleteAccount({
                  variables: {
                    deleteAccountInput: {
                      accountNo: item.accountNo,
                    },
                  },
                });
                if (deletData?.deleteAccount.ok) {
                  alert("삭제되었습니다.");
                } else {
                  alert(deletData?.deleteAccount.error);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </ListDiv>
      </ul>
    );
  });

  //지출내역
  const expenseList = expense?.map((item) => {
    return (
      <ListDiv key={item.accountNo}>
        <ListLi key={item.accountNo}>
          <div>{item.date} </div>
          <div>
            {item.category} : {item.amount.toLocaleString()}원
          </div>
        </ListLi>
        <DeleteImg
          src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/close.png"
          alt="삭제"
          onClick={async (e) => {
            e.preventDefault();
            try {
              const { data: deletData } = await deleteAccount({
                variables: {
                  deleteAccountInput: {
                    accountNo: item.accountNo,
                  },
                },
              });
              if (deletData?.deleteAccount.ok) {
                alert("삭제되었습니다.");
              } else {
                alert(deletData?.deleteAccount.error);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </ListDiv>
    );
  });

  useEffect(() => {
    refetch();
  });

  return (
    <>
      <AccountDetailWrapper>
        <DetailLayOut typeName="수입" content={profitList} />
        <DetailLayOut typeName="지출" content={expenseList} />
      </AccountDetailWrapper>
    </>
  );
}

export default AccountDetail;
