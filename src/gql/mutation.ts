import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteUser($deleteUserInput: DeleteUserInput!) {
    deleteUser(input: $deleteUserInput) {
      ok
      error
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($deleteAccountInput: DeleteAccountInput!) {
    deleteAccount(input: $deleteAccountInput) {
      ok
      error
    }
  }
`;

export const CREATE_FASSION = gql`
  mutation createFassion($createFassionInput: CreateFassionInput!) {
    createFassion(input: $createFassionInput) {
      ok
      error
    }
  }
`;

export const VIEW_UPDATE = gql`
  mutation viewUpdate($viewUpdateInput: ViewUpadateInput!) {
    viewUpdate(input: $viewUpdateInput) {
      ok
      error
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($createReviewInput: CreateReviewInput!) {
    createReview(input: $createReviewInput) {
      ok
      error
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview($editReviewInput: EditReviewInput!) {
    editReview(input: $editReviewInput) {
      ok
      error
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewInput: DeleteReviewInput!) {
    deleteReview(input: $deleteReviewInput) {
      ok
      error
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      ok
      error
    }
  }
`;

export const CHANGE_USER_IMG = gql`
  mutation changeUserImg($changeUserImgInput: ChangeUserImgInput!) {
    changeUserImg(input: $changeUserImgInput) {
      ok
      error
    }
  }
`;

export const CHANGE_PW = gql`
  mutation changePw($changePwInput: ChangePwInput!) {
    changePw(input: $changePwInput) {
      ok
      error
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const LIKE_UPDATE = gql`
  mutation likeUpdate($likeUpdateInput: LikeUpdateInput!) {
    likeUpdate(input: $likeUpdateInput) {
      ok
      error
    }
  }
`;

export const LIKE_REMOVE = gql`
  mutation likeRemove($likeUpdateInput: LikeUpdateInput!) {
    likeRemove(input: $likeUpdateInput) {
      ok
      error
    }
  }
`;

export const MARKET_VIEW_UPDATE = gql`
  mutation marketViewUpdate($marketViewUpdateInput: MarketViewUpdateInput!) {
    marketViewUpdate(input: $marketViewUpdateInput) {
      ok
      error
    }
  }
`;

export const EDIT_MARKET = gql`
  mutation editMarket($editMarketInput: EditMarketInput!) {
    editMarket(input: $editMarketInput) {
      ok
      error
    }
  }
`;

export const DELETE_MARKET = gql`
  mutation deleteMarket($deleteMarketInput: DeleteMarketInput!) {
    deleteMarket(input: $deleteMarketInput) {
      ok
      error
    }
  }
`;

export const CREATE_MARKET = gql`
  mutation createMarket($createMarketInput: CreateMarketInput!) {
    createMarket(input: $createMarketInput) {
      ok
      error
    }
  }
`;

export const SAVE_CHAT = gql`
  mutation saveChat($saveChatInput: SaveChatInput!) {
    saveChat(input: $saveChatInput) {
      ok
      error
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($deleteChatLogInput: DeleteChatLogInput!) {
    deleteChat(input: $deleteChatLogInput) {
      ok
      error
    }
  }
`;
