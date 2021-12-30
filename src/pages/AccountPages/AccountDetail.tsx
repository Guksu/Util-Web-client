import { useMutation, useQuery } from "@apollo/client";
import DetailLayOut from "../../components/AccountComponents/DetailLayOut";
import { DELETE_ACCOUNT } from "../../gql/mutation";
import { GET_ALL_ACCOUNT_LIST } from "../../gql/query";
import { DeleteAccountIF, GetAccountListIF } from "../../interfaces/AccountIF";

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
        <li key={item.accountNo}>
          {item.date} {item.category} : {item.amount}
        </li>
        <button
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
        >
          ❌
        </button>
      </ul>
    );
  });

  const expenseList = expense?.map((item) => {
    return (
      <ul key={item.accountNo}>
        <li key={item.accountNo}>
          {item.date} {item.category} : {item.amount}
        </li>
        <button
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
        >
          ❌
        </button>
      </ul>
    );
  });

  return (
    <>
      <DetailLayOut typeName="수입" content={profitList} />
      <DetailLayOut typeName="지출" content={expenseList} />
    </>
  );
}

export default AccountDetail;
