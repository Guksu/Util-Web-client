import { CommonOutput } from "./CommonIF";

export interface Account {
  category: string;
  type: string;
  amount: number;
  date: Date;
  accountNo: number;
}

export interface GetAccountListOutput extends CommonOutput {
  account?: Account[];
}

export interface GetAccountListIF {
  getAccountList: GetAccountListOutput;
}

export interface DeleteAccountIF {
  deleteAccount: CommonOutput;
}

export interface DataIF {
  id: string;
  value: number;
  color: string;
}

export interface CreateAccountIF {
  createAccount: CommonOutput;
}
