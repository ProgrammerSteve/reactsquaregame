const purpleSquare = (displayIncrement:number, xArr:number, yArr:number, key:string|number) => {
  return (
    <div
      key={key}
      style={{
        position: `absolute`,
        width: `${displayIncrement - 4}px`,
        height: `${displayIncrement - 4}px`,
        backgroundColor: `purple`,
        marginLeft: `${xArr}px`,
        marginTop: `${yArr}px`,
        border: `2px solid black`,
      }}
    />
  );
};
export default purpleSquare;