import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateFassionIF } from "../../intefaces/FassionIF";

const CREATE_FASSION = gql`
  mutation createFassion($createFassionInput: CreateFassionInput!) {
    createFassion(input: $createFassionInput) {
      ok
      error
    }
  }
`;

function Uploads() {
  const [file, setFile] = useState<FileList | null>();
  const history = useHistory();
  const [date, setDate] = useState("");
  const [secret, setSecret] = useState("no");
  const [createFassion] = useMutation<CreateFassionIF>(CREATE_FASSION);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      if (file) {
        const actualFile = file[0];
        const formData = new FormData();
        formData.append("file", actualFile);
        const { url: imgUrl } = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formData,
          })
        ).json();

        const { data } = await createFassion({
          variables: { createFassionInput: { date, imgUrl, secret } },
        });
        if (data?.createFassion.ok) {
          alert("등록되었습니다.");
          history.push("/fassion/mystyle");
        } else {
          alert(data?.createFassion.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="date"
          required
          onChange={(e) => {
            setDate(e.currentTarget.value);
          }}
        />
        <input
          type="file"
          name="file"
          required
          accept="image/*"
          onChange={(e) => {
            setFile(e.currentTarget.files);
          }}
        />
        <select
          required
          onChange={(e) => {
            setSecret(e.currentTarget.value);
          }}
        >
          <option value={""}>게시판 공개여부</option>
          <option value="yes">공개</option>
          <option value="no">비공개</option>
        </select>
        <button>등록하기</button>
      </form>
    </>
  );
}

export default Uploads;
