import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ProfileInfoIF } from "../../pages/UserPages/Profile";
import ProfileLayOut from "./ProfileLayOut";

interface Props {
  PROFILE_IMG: any;
}

function ProfileImg({ PROFILE_IMG }: Props) {
  const { data } = useQuery<ProfileInfoIF>(PROFILE_IMG);
  const userImg = data?.profileInfo.userImgUrl;
  const divContent = <h1>{userImg}</h1>;
  const history = useHistory();

  return (
    <>
      <ProfileLayOut
        divName="프로필 이미지"
        divContent={divContent}
        btnName="변경하기"
        btnOnclick={() => {
          history.push("/user/edit/img");
        }}
      />
    </>
  );
}

export default ProfileImg;
