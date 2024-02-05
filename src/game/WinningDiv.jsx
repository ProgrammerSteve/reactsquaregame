import React from 'react'
//appears when game is completed
const WinningDiv = ({level}) => {
   
      return (
        <div
          style={{
            zIndex: `1`,
            position: `absolute`,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
  
            display: "grid",
            placeItems: "center",
            color: `white`,
            textShadow:
              "-1px -1px 0 #000,0 -1px 0 #000,1px -1px 0 #000,1px 0 0 #000,1px 1px 0 #000,0 1px 0 #000,-1px 1px 0 #000,-1px 0 0 #000",
          }}
        >
          <h2 style={{ fontWeight: "700", paddingInline: 20 }}>
            WINNER! Thanks For Playing!
          </h2>
          <h3>[Press B to start again]</h3>
        </div>
      );
  };
  export default WinningDiv