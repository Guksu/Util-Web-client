import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ProfileInfoIF } from "../../interfaces/UserIF";
import ProfileLayOut from "./ProfileLayOut";

interface Props {
  PROFILE_INFO: any;
}

function ProfileInfo({ PROFILE_INFO }: Props) {
  const history = useHistory();
  const { data } = useQuery<ProfileInfoIF>(PROFILE_INFO);

  const divContent = (
    <>
      <h1>이름 : {data?.profileInfo.id}</h1>
      <h1>아이디 : {data?.profileInfo.id}</h1>
    </>
  );

  return (
    <>
      <ProfileLayOut
        divName="회원정보"
        btnName="비밀번호 변경하기"
        divContent={divContent}
        btnOnclick={() => {
          history.push("/user/edit/pw");
        }}
      />
    </>
  );
}

export default ProfileInfo;
