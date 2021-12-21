interface Props {
  typeName: string;
  content: any;
}

function DetailLayOut({ typeName, content }: Props) {
  return (
    <>
      <div>
        <span>{typeName}</span>
        {content}
      </div>
    </>
  );
}

export default DetailLayOut;
