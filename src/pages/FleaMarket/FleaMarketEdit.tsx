import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isFleaContentAtom, isFleaNoAtom, isFleaTitleAtom } from "../../atom";
import { DELETE_MARKET, EDIT_MARKET } from "../../gql/mutation";
import { DeleteMarketIF, EditMarketIF } from "../../interfaces/FleaMarket";
import {
  Btn,
  BtnDiv,
  EditContent,
  EditTitle,
  ReviewEditWrapper,
} from "../FoodPages/FoodReviewEdit";

function FleaMarketEdit() {
  const isFleaNo = useRecoilValue(isFleaNoAtom);
  const isFleaTitle = useRecoilValue(isFleaTitleAtom);
  const isFleaContent = useRecoilValue(isFleaContentAtom);
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");

  const [editMarket] = useMutation<EditMarketIF>(EDIT_MARKET, {
    variables: { editMarketInput: { FleaMarketNo: isFleaNo, date, content } },
  });

  const [deleteMarket] = useMutation<DeleteMarketIF>(DELETE_MARKET, {
    variables: { deleteMarketInput: { FleaMarketNo: isFleaNo } },
  });

  const onEditClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { data: editData } = await editMarket();
      if (editData?.editMarket.ok) {
        alert("수정되었습니다.");
        window.location.replace("/fleamarket");
      } else {
        alert(editData?.editMarket.error);
      }
    } catch (error) {}
  };

  const onDeleteClick = async () => {
    try {
      const { data: deleteData } = await deleteMarket();
      if (deleteData?.deleteMarket.ok) {
        alert("삭제되었습니다.");
        window.location.replace("/fleamarket");
      } else {
        alert(deleteData?.deleteMarket.error);
      }
    } catch (error) {}
  };
  return (
    <>
      <ReviewEditWrapper>
        <EditTitle>{isFleaTitle}</EditTitle>
        <EditContent
          maxLength={2000}
          defaultValue={isFleaContent}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <BtnDiv>
          <Btn onClick={onEditClick}>수정하기</Btn>
          <Btn onClick={onDeleteClick}>삭제하기</Btn>
        </BtnDiv>
      </ReviewEditWrapper>
    </>
  );
}

export default FleaMarketEdit;
