import { useState } from "preact/hooks";

type Props  = {
  heyPlay?: boolean;
  heyCount?: number;
  heyBpm: number;
  heyBeatsPerMeasure?: number;
}

function Metronome({heyPlay, heyCount, heyBpm, heyBeatsPerMeasure}: Props) {
  const [isPlaying, setIsPlaying] = useState(heyPlay || false)
  const [count, setCount] = useState(heyCount || 0)
  const [bpm, setBpm] = useState(heyBpm)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(heyBeatsPerMeasure || 4)

  const click1 = new Audio('https://daveceddia.com/freebies/react-metronome/click1.wav');
  const click2 = new Audio('https://daveceddia.com/freebies/react-metronome/click2.wav');

  const playClick = () => {
    if (count % beatsPerMeasure === 0) {
      click2.play();
    } else {
      click1.play();
    }

    // keep track of which beat we're on
    setCount((count + 1) % beatsPerMeasure);
  };

  const startStop = () => {
    let timer;
    if (isPlaying) {
      // stop the timer
      clearInterval(timer);
      setIsPlaying(false);
      console.log('STOPPing')
    } else {
      // start a timer with current bpm
      timer = setInterval(playClick, (60 / bpm) * 1000);
      setIsPlaying(true)
      setCount(heyCount || 0)
      playClick()
    }
  };

  return (
    <div onClick={startStop} />
  );
}

export default Metronome;
