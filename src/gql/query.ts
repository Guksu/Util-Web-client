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
        userImg
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
        userImg
        like
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
        userImg
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

export const LIKE_CHECK = gql`
  query likeCheck {
    likeCheck {
      ok
      error
      like
    }
  }
`;

export const GET_MARKET = gql`
  query getMarket($getMarketInput: GetMarketInput!) {
    getMarket(input: $getMarketInput) {
      ok
      error
      market {
        title
        view
        userName
        date
        content
        productImg
        userImg
      }
    }
  }
`;

export const GET_MARKET_LIST = gql`
  query getMarketList {
    getMarketList {
      ok
      error
      market {
        title
        view
        userName
        date
        category
        FleaMarketNo
      }
    }
  }
`;
