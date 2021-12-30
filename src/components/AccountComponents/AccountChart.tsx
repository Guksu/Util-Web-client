import { useQuery } from "@apollo/client";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import { GET_ALL_ACCOUNT } from "../../gql/query";
import { DataIF, GetAccountListIF } from "../../interfaces/AccountIF";

function AccountChart() {
  const { data: allList } = useQuery<GetAccountListIF>(GET_ALL_ACCOUNT);
  const profitList = allList?.getAccountList.account?.filter(
    (item) => item.type === "profit"
  );
  const expenseList = allList?.getAccountList.account?.filter(
    (item) => item.type === "expense"
  );
  //총지출 / 총수익  내역
  let allProfitValue = 0;
  let allExpenseValue = 0;

  if (profitList)
    for (let i = 0; i < profitList.length; i++) {
      allProfitValue += profitList[i].amount;
    }

  if (expenseList)
    for (let i = 0; i < expenseList.length; i++) {
      allExpenseValue += expenseList[i].amount;
    }

  const allData = [
    {
      id: "총수익",
      value: Math.ceil(
        (allProfitValue / (allProfitValue + allExpenseValue)) * 100
      ),
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "총지출",
      value: Math.ceil(
        (allExpenseValue / (allProfitValue + allExpenseValue)) * 100
      ),
      color: "hsl(17, 70%, 50%)",
    },
  ];

  //수익 내역
  const profitWage = profitList?.filter((item) => item.category === "급여");
  const profitInvest = profitList?.filter((itme) => itme.category === "투자");
  const profitEtc = profitList?.filter((itme) => itme.category === "기타등등");
  let pWage = 0;
  let pInvest = 0;
  let pEtc = 0;

  if (profitWage)
    for (let i = 0; i < profitWage?.length; i++) {
      pWage += profitWage[i].amount;
    }
  if (profitInvest)
    for (let i = 0; i < profitInvest?.length; i++) {
      pInvest += profitInvest[i].amount;
    }
  if (profitEtc)
    for (let i = 0; i < profitEtc?.length; i++) {
      pEtc += profitEtc[i].amount;
    }

  const profitData = [
    {
      id: "급여",
      value: Math.ceil((pWage / (pWage + pInvest + pEtc)) * 100),
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "투자",
      value: Math.ceil((pInvest / (pWage + pInvest + pEtc)) * 100),
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "기타등등",
      value: Math.ceil((pEtc / (pWage + pInvest + pEtc)) * 100),
      color: "hsl(297, 70%, 50%)",
    },
  ];

  //지출 내역
  const expenseFood = expenseList?.filter((item) => item.category === "식비");
  const expenseClothes = expenseList?.filter(
    (itme) => itme.category === "의류비"
  );
  const expenseTp = expenseList?.filter((itme) => itme.category === "교통비");
  const expenseTex = expenseList?.filter((itme) => itme.category === "세금");
  const expenseEnt = expenseList?.filter((itme) => itme.category === "유흥비");
  const expenseEtc = expenseList?.filter(
    (itme) => itme.category === "기타등등"
  );
  let eFood = 0;
  let eClothes = 0;
  let eTp = 0;
  let eTex = 0;
  let eEnt = 0;
  let eEtc = 0;

  if (expenseFood)
    for (let i = 0; i < expenseFood?.length; i++) {
      eFood += expenseFood[i].amount;
    }
  if (expenseClothes)
    for (let i = 0; i < expenseClothes?.length; i++) {
      eClothes += expenseClothes[i].amount;
    }
  if (expenseTp)
    for (let i = 0; i < expenseTp?.length; i++) {
      eTp += expenseTp[i].amount;
    }
  if (expenseTex)
    for (let i = 0; i < expenseTex?.length; i++) {
      eTex += expenseTex[i].amount;
    }
  if (expenseEnt)
    for (let i = 0; i < expenseEnt?.length; i++) {
      eEnt += expenseEnt[i].amount;
    }
  if (expenseEtc)
    for (let i = 0; i < expenseEtc?.length; i++) {
      eEtc += expenseEtc[i].amount;
    }

  const expenseData = [
    {
      id: "식비",
      value: Math.ceil(
        (eFood / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "의류비",
      value: Math.ceil(
        (eClothes / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "교통비",
      value: Math.ceil(
        (eTp / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(297, 70%, 50%)",
    },
    {
      id: "세금",
      value: Math.ceil(
        (eTex / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(260.81632653061223, 62.0253164556962%, 46.470588235294116%)",
    },
    {
      id: "유흥비",
      value: Math.ceil(
        (eEnt / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(165, 63.36633663366336%, 39.6078431372549%)",
    },
    {
      id: "기타등등",
      value: Math.ceil(
        (eEtc / (eFood + eClothes + eTp + eTex + eEnt + eEtc)) * 100
      ),
      color: "hsl(60.8780487804878, 81.0276679841897%, 50.3921568627451%)",
    },
  ];

  const [data, setData] = useState<DataIF[]>(allData);
  const [num, setNum] = useState(0);

  useEffect(() => {
    setData(allData);
  }, [allList]);

  return (
    <>
      <div>
        {num > 0 && (
          <span
            onClick={() => {
              num === 2 && setData(profitData);
              num === 1 && setData(allData);
              setNum(num - 1);
            }}
          >
            ◀
          </span>
        )}
        <div style={{ height: 350, width: 350 }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
            valueFormat=">-~%"
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={4}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "pastel1" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
            enableArcLinkLabels={false}
            arcLinkLabelsTextOffset={3}
            arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
            arcLinkLabelsDiagonalLength={9}
            arcLinkLabelsStraightLength={13}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color", modifiers: [] }}
            isInteractive={false}
            arcLabel={function (e) {
              return e.id + ` ${e.value}% `;
            }}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 8]] }}
            legends={[]}
          />
        </div>
        {num < 2 && (
          <span
            onClick={() => {
              num === 0 && setData(profitData);
              num === 1 && setData(expenseData);
              setNum(num + 1);
            }}
          >
            ▶
          </span>
        )}
      </div>
    </>
  );
}

export default AccountChart;
