interface Props {
  divName: string;
  btnName: string;
  divContent: any;
  btnOnclick: any;
}

function ProfileDiv({ divName, btnName, divContent, btnOnclick }: Props) {
  return (
    <>
      <h1>{divName}</h1>
      <div>
        {divContent}
        <button onClick={btnOnclick}>{btnName}</button>
      </div>
    </>
  );
}

export default ProfileDiv;
