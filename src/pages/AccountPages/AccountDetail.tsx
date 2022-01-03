import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import DetailLayOut from "../../components/AccountComponents/DetailLayOut";
import { DELETE_ACCOUNT } from "../../gql/mutation";
import { GET_ALL_ACCOUNT_LIST } from "../../gql/query";
import { DeleteAccountIF, GetAccountListIF } from "../../interfaces/AccountIF";
import { AccountWrapper } from "./Account";

const ListDiv = styled.div`
  display: flex;
  font-size: 20px;
`;

const ListLi = styled.li`
  display: grid;
  width: 40vw;
  grid-template-columns: 20% 70%;
  margin: 1%;
`;

const DeleteImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 1%;
`;

function AccountDetail() {
  const { data: getList } = useQuery<GetAccountListIF>(GET_ALL_ACCOUNT_LIST);
  const [deleteAccount] = useMutation<DeleteAccountIF>(DELETE_ACCOUNT);

  const profit = getList?.getAccountList.account?.filter(
    (item) => item.type === "profit"
  );
  const expense = getList?.getAccountList.account?.filter(
    (item) => item.type === "expense"
  );

  const profitList = profit?.map((item) => {
    return (
      <ul key={item.accountNo}>
        <ListDiv>
          <ListLi key={item.accountNo}>
            <div>{item.date} </div>
            <div>
              {item.category} : {item.amount}
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
                  window.location.replace("/account/detail");
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

  const expenseList = expense?.map((item) => {
    return (
      <ListDiv key={item.accountNo}>
        <ListLi key={item.accountNo}>
          <div>{item.date} </div>
          <div>
            {item.category} : {item.amount}
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
                window.location.replace("/account/detail");
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

  return (
    <>
      <AccountWrapper>
        <DetailLayOut typeName="수입" content={profitList} />
        <DetailLayOut typeName="지출" content={expenseList} />
      </AccountWrapper>
    </>
  );
}

export default AccountDetail;
