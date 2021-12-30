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
