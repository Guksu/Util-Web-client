import { CommonOutput } from "./CommonIF";

export interface Fassion {
  fassionNo: number;
  date: string;
  imgUrl: string;
  userImg: string;
  like?: number;
}

export interface GetMyFassionListOutput extends CommonOutput {
  fassion?: Fassion[];
}

export interface GetMyFassionListIF {
  getMyFassionList: GetMyFassionListOutput;
}

export interface GetAllFassionListIF {
  getAllFassionList: GetMyFassionListOutput;
}
export interface CreateFassionIF {
  createFassion: CommonOutput;
}

export interface ImgIF {
  link: string[];
}

export interface LikeCheckOutput extends CommonOutput {
  like?: number[];
}

export interface LikeCheckIF {
  likeCheck: LikeCheckOutput;
}
