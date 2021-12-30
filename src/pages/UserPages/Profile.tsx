import DeleteUser from "../../components/ProfileComponents/DeleteUser";
import ProfileImg from "../../components/ProfileComponents/ProfileImg";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import { PROFILE } from "../../gql/query";

function Profile() {
  return (
    <>
      <ProfileInfo PROFILE_INFO={PROFILE} />
      <ProfileImg PROFILE_IMG={PROFILE} />
      <DeleteUser />
    </>
  );
}

export default Profile;
