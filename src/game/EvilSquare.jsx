import React, {useEffect} from 'react'
import PurpleSquare from "./PurpleSquare";


const EvilSquare = ({level, coord, displayIncrement}) => {
    let coordArr=coord[`stage${level}`] || []
    useEffect(()=>{
        console.log(coord)
    },[coord])
    return(
        <>
            {
                coordArr.map((pos,ind) =>  <PurpleSquare xArr={pos[0]} yArr={pos[1]} displayIncrement={displayIncrement} key={`evilSq-${ind}`}/>)
            }
        </>
    );
  };

  export default EvilSquare