import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DELETE_MARKET, EDIT_MARKET } from "../../gql/mutation";
import { GET_MARKET } from "../../gql/query";
import { IDarams } from "../../interfaces/CommonIF";
import {
  DeleteMarketIF,
  EditMarketIF,
  GetMarketIF,
} from "../../interfaces/FleaMarket";
import {
  Btn,
  BtnDiv,
  EditContent,
  EditTitle,
  ReviewEditWrapper,
} from "../FoodPages/FoodReviewEdit";

function FleaMarketEdit() {
  const params = useParams<IDarams>();
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");

  const { data: marketData } = useQuery<GetMarketIF>(GET_MARKET, {
    variables: { getMarketInput: { FleaMarketNo: Number(params.id) } },
  });

  const [editMarket] = useMutation<EditMarketIF>(EDIT_MARKET, {
    variables: {
      editMarketInput: { FleaMarketNo: Number(params.id), date, content },
    },
  });

  const [deleteMarket] = useMutation<DeleteMarketIF>(DELETE_MARKET, {
    variables: { deleteMarketInput: { FleaMarketNo: Number(params.id) } },
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
        <EditTitle>{marketData?.getMarket.market.title}</EditTitle>
        <EditContent
          maxLength={2000}
          defaultValue={marketData?.getMarket.market.content}
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
