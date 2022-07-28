import MetronomeIcon from './MetronomeIcon';
import { useContext, useEffect, useState } from 'preact/hooks';
import { StateContext } from '../../app';

type Props = {
  song: Song
  id: number
  currentSong: number | undefined
  setCurrentSong: Function
}


const click1 = new Audio('https://daveceddia.com/freebies/react-metronome/click1.wav');
const click2 = new Audio('https://daveceddia.com/freebies/react-metronome/click2.wav');

function Song({song, id, currentSong, setCurrentSong}: Props) {
  const context = useContext(StateContext)
  const [timer, setTimer] = useState<any>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [count, setCount] = useState(0)
  const [bpm, setBpm] = useState(song.bpm)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)

  const playClick = () => {
    console.log('Playing', id)
    if (count % beatsPerMeasure === 0) {
      click2.play();
    } else {
      click1.play();
    }
    // keep track of which beat we're on
    setCount((count + 1) % beatsPerMeasure);
  };

  const startStop = () => {
    if (isPlaying) {
      clearInterval(timer);
      setIsPlaying(false);
    } else {
      setTimer(setInterval(playClick, (60 / bpm) * 1000));
      setIsPlaying(true)
      setCount(0)
      playClick()
    }
  };

  const changeCurrentSong = () => {
    startStop()
    if(currentSong !== id) {
      setCurrentSong(id)
      return;
    };
    setCurrentSong(undefined)
  }

  useEffect(() => {
    if(currentSong === undefined) return;
    if(isPlaying && currentSong === id) return;
    console.log('stoppng', id)
    click1.pause()
    click2.pause()
  }, [isPlaying, currentSong])

  return (
    <div class='flex flex-col items-center gap-3 px-6 py-2 shadow-lg w-full rounded-lg'>
      <h4 class="font-bold">{song.name}</h4>
      <div className="flex items-center justify-between space-x-3 h-full w-full">
        <div className="w-4/5">
          <p><span class="font-semibold">{song.bpm}</span> bpm（{song.time_signature}）</p>
          <p>{song.length} 分</p>
        </div>
        {/* <span class="h-12 w-[2px] bg-slate-400 mr-5 " /> */}
        <div onClick={changeCurrentSong} class={`relative w-7 h-7 ${context.dark && 'fill-[#fafafa]'} ${isPlaying && 'fill-theme'}`}>
          <MetronomeIcon />
          <div className="absolute -top-2 w-auto h-12">
            {/* <Metronome heyBpm={song.bpm} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Song