export const StatusBar = (props: { text?: string }) => {
  return (
    <div
      style={{
        height: '100%',
        padding: ' 0px 10px',
        fontSize: '.85em',
        display: 'flex',
        backgroundColor: 'rgb(0,122,204)',
        userSelect: 'none',
      }}
    >
      <span style={{ color: 'white', margin: 'auto 0px' }}>{props.text}</span>
    </div>
  );
};
