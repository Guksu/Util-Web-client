interface Props {
  content: any;
}

function FassionLayOut({ content }: Props) {
  return (
    <>
      <div>{content}</div>
      <div>1/2</div>
    </>
  );
}

export default FassionLayOut;
