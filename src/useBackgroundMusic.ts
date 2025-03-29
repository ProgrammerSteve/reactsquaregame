import { useEffect, useRef } from "react";
import { Howl } from "howler";


//const bgm = "/assets/touhou_bg_music.mp3";
const bgm = `${import.meta.env.BASE_URL}assets/touhou_bg_music.mp3`

export const useBackgroundMusic = (enabled: boolean) => {
  const soundRef = useRef<Howl | null>(null);


useEffect(() => {
  soundRef.current = new Howl({
    src: [bgm],
    loop: true,
    volume: 0.25,
  });

  return () => {
    soundRef.current?.stop();
    soundRef.current?.unload();
    soundRef.current = null;
  };
}, []);








  useEffect(() => {
    if (enabled) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
  }, [enabled]);
};
