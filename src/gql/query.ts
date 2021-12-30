import { gql } from "@apollo/client";

export const GET_ALL_ACCOUNT = gql`
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

export const PROFILE_INFO = gql`
  query profileInfo {
    profileInfo {
      ok
      error
      userImgUrl
    }
  }
`;

export const GET_ALL_ACCOUNT_LIST = gql`
  query getAccountList {
    getAccountList {
      ok
      error
      account {
        category
        type
        amount
        date
        accountNo
      }
    }
  }
`;

export const GET_MY_FASSION_LIST = gql`
  query getMyFassionList {
    getMyFassionList {
      ok
      error
      fassion {
        fassionNo
        date
        imgUrl
      }
    }
  }
`;

export const GET_ALL_FASSION_LIST = gql`
  query getAllFassionList {
    getAllFassionList {
      ok
      error
      fassion {
        fassionNo
        date
        imgUrl
      }
    }
  }
`;

export const GET_REVIEW = gql`
  query getReview($getReviewInput: GetReviewInput!) {
    getReview(input: $getReviewInput) {
      ok
      error
      review {
        title
        content
        date
        view
        userName
      }
    }
  }
`;

export const GET_FOOD_REVIEW_LIST = gql`
  query getFoodReviewList {
    getFoodReviewList {
      ok
      error
      review {
        FoodBoardNo
        category
        title
        date
        view
        userName
      }
    }
  }
`;

export const PROFILE = gql`
  query profileInfo {
    profileInfo {
      ok
      error
      name
      id
      userImgUrl
    }
  }
`;
