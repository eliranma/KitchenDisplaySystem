const Card = (props) => (
    <div
      style={{
        backgroundColor: 'tan',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      {...props}
    >
      {props.children}
    </div>
  );
  export default Card