import { gql, useQuery } from "@apollo/client";
import { ResponsivePie } from "@nivo/pie";

interface Account {
  category: string;
  type: string;
  amount: number;
}

interface GetAccountListOutput {
  ok: string;
  error: string;
  account?: Account[];
}

interface GetAccountListIF {
  getAccountList: GetAccountListOutput;
}

const GET_ALL_ACCOUNT_LIST = gql`
  query getAccountList {
    getAccountList {
      ok
      error
      account {
        category
        type
        amount
      }
    }
  }
`;

function AccountChart() {
  const { data: getList } = useQuery<GetAccountListIF>(GET_ALL_ACCOUNT_LIST);

  const data = [
    {
      id: "급여",
      value: 10,
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "투자",
      value: 20,
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "용돈",
      value: 30,
      color: "hsl(297, 70%, 50%)",
    },
    {
      id: "기타등등",
      value: 40,
      color: "hsl(320, 70%, 50%)",
    },
  ];

  return (
    <>
      <div>
        <span>◀</span>
        <div style={{ height: 350, width: 350 }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
            valueFormat=" >-~"
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
            arcLabel={function (e) {
              return e.id + " (" + e.value + ")";
            }}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 8]] }}
            legends={[]}
          />
        </div>
        <span>▶</span>
      </div>
    </>
  );
}

export default AccountChart;
