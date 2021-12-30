import { CommonOutput } from "./CommonIF";

export interface FoodBoard {
  FoodBoardNo: number;
  category: string;
  title: string;
  content: string;
  date: string;
  view: number;
  userName: string;
}

export interface GetReviewOutput extends CommonOutput {
  review?: FoodBoard;
}

export interface GetReviewIF {
  getReview: GetReviewOutput;
}

export interface CreateReviewIF {
  createReview: CommonOutput;
}

export interface GetFoodReviewListOutput extends CommonOutput {
  review?: FoodBoard[];
}

export interface GetFoodReviewListIF {
  getFoodReviewList: GetFoodReviewListOutput;
}

export interface ViewUpdateIF {
  viewUpdate: CommonOutput;
}

export interface EditReviewIF {
  editReview: CommonOutput;
}

export interface DeleteReviewIF {
  deleteReview: CommonOutput;
}
