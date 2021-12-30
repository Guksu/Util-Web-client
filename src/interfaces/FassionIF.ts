import { CommonOutput } from "./CommonIF";

export interface Fassion {
  fassionNo: number;
  date: string;
  imgUrl: string;
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
