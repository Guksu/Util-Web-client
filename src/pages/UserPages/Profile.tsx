import { gql } from "@apollo/client";
import DeleteUser from "../../components/ProfileComponents/DeleteUser";
import ProfileImg from "../../components/ProfileComponents/ProfileImg";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";

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
      <ProfileInfo PROFILE_INFO={PROFILE_INFO} />
      <ProfileImg PROFILE_IMG={PROFILE_INFO} />
      <DeleteUser />
    </>
  );
}

export default Profile;
