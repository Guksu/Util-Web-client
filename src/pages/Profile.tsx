import LoginCheck from "../components/LoginCheck";
import ProfileImg from "../components/ProfileComponents/ProfileImg";
import ProfileInfo from "../components/ProfileComponents/ProfileInfo";
import DeleteUser from "../components/ProfileComponents/DeleteUser";
import { gql } from "@apollo/client";

export interface ProfileInfoOutput {
  ok: string;
  error?: string;
  name?: string;
  id?: string;
  userImgUrl?: string;
}

export interface ProfileInfoIF {
  profileInfo: ProfileInfoOutput;
}

const PROFILE_INFO = gql`
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

function Profile() {
  return (
    <>
      <LoginCheck />
      <ProfileInfo PROFILE_INFO={PROFILE_INFO} />
      <ProfileImg PROFILE_IMG={PROFILE_INFO} />
      <DeleteUser />
    </>
  );
}

export default Profile;
