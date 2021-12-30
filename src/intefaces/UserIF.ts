import { CommonOutput } from "./CommonIF";

export interface CreateUserIF {
  createUser: CommonOutput;
}
export interface DeleteUserIF {
  deleteUser: CommonOutput;
}

export interface ChangeUserImgIF {
  changeUserImg: CommonOutput;
}

export interface ChangePwIF {
  changePw: CommonOutput;
}
export interface LoginOutput extends CommonOutput {
  token?: string;
}

export interface LoginIF {
  login: LoginOutput;
}

export interface ProfileInfoOutput extends CommonOutput {
  name?: string;
  id?: string;
  userImgUrl?: string;
}

export interface ProfileInfoIF {
  profileInfo: ProfileInfoOutput;
}
