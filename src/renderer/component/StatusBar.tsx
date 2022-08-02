
export const StatusBar = (props:{
    text?:string
}) => {
  return (
    <div
      className=" tw-bg-blue-600"
      style={{
        height: '100%',
        padding: ' 0px 10px',
        fontSize:".85em",
        display:"flex",
        backgroundColor: 'rgb(0,122,204)',
      }}
    >
      <span className=" tw-text-white tw-my-auto">{props.text}</span>
    </div>
  );
};
