import { CommonOutput } from "./CommonIF";

export interface FleaMarket {
  FleaMarketNo: number;
  title: string;
  content: string;
  date: string;
  view: number;
  userImg: string;
  productImg: string;
  userName: string;
  category: string;
}

export interface GetMarketListOutput extends CommonOutput {
  market: FleaMarket[];
}

export interface GetMarketListIF {
  getMarketList: GetMarketListOutput;
}

export interface MarketViewUpdateIF {
  marketViewUpdate: CommonOutput;
}

export interface GetMarketOutput extends CommonOutput {
  market: FleaMarket;
}

export interface GetMarketIF {
  getMarket: GetMarketOutput;
}

export interface EditMarketIF {
  editMarket: CommonOutput;
}
export interface DeleteMarketIF {
  deleteMarket: CommonOutput;
}

export interface CreateMarketIF {
  createMarket: CommonOutput;
}

export interface Message {
  id: string;
  name: string;
  text: string;
}

export interface Payload {
  name: string;
  text: string;
  room: string;
}

export interface SaveChatIF {
  saveChat: CommonOutput;
}

export interface ChatLog {
  chatLogNo: number;
  name: string;
  chatLog: string;
}

export interface GetChatOutput extends CommonOutput {
  chatLog: ChatLog[];
}

export interface GetChatIF {
  getChat: GetChatOutput;
}

export interface DeleteChatIF {
  deleteChat: CommonOutput;
}
