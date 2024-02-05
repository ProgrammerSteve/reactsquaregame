import React from 'react'


const PurpleSquare = ({xArr, yArr,displayIncrement}) => {
    
    return (
      <div
        style={{
          position: `absolute`,
          width: `${displayIncrement - 4}px`, //ALTERATION 1
          height: `${displayIncrement - 4}px`, //ALETERATION 1
          backgroundColor: `purple`,
          marginLeft: `${xArr}px`,
          marginTop: `${yArr}px`,
          border: `2px solid black`,
        }}
      />
    );
  };

  export default PurpleSquare