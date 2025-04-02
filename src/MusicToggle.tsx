import { useState } from "react";
import { useBackgroundMusic } from "./useBackgroundMusic";
import { FaMusic } from "react-icons/fa";

export default function MusicToggle() {
  const [musicOn, setMusicOn] = useState(false); // must be false initially
  useBackgroundMusic(musicOn);

  return (
    <button
      onClick={() => {
        setMusicOn(prev => !prev); // user gesture
      }}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 999,
        fontSize: "0.8rem",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer"
      }}
    >
      <FaMusic style={{ opacity: musicOn ? 1 : 0.3 }} />
    </button>
  );
}
