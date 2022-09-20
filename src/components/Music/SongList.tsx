import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { BsFillPlayFill } from 'react-icons/bs';
import { getSong } from '../../../lib/firebase';
import { StateContext } from '../../app';
import MetronomeIcon from './MetronomeIcon';
import PlayBox from './PlayBox';

type Props = {
  song: Song
  id: number
  currentSong?: number | undefined
  setCurrentSong?: Function
}

function Song({song, id, currentSong, setCurrentSong}: Props) {
  const firstUpdate = useRef(true);
  const audioRef = useRef(null)
  
  const context = useContext(StateContext)
  const [bpm, setBpm] = useState(song.bpm)
  const [isPlaying, setIsPlaying] = useState(false)
  const [metronomeOpen, setMetronomeOpen] = useState(false)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if(isPlaying && audioRef.current) {
      getSong(song.audio_path, audioRef.current)
      return;
    }
  }, [isPlaying])

  return (
    <div class='flex flex-col items-center gap-3 px-6 py-2 shadow-lg w-full rounded-lg'>
      <h4 class="font-bold">{song.title}</h4>
      <div className="flex items-center justify-between space-x-3 h-full w-full">
        <div className="w-4/5">
          <p><span class="font-semibold">{song.bpm}</span> bpm（{song.time_signature}）</p>
          <p>{song.length} 分</p>
        </div>
        <div onClick={() => setIsPlaying(!isPlaying)} class={`relative text-3xl ${context.dark && 'fill-[#fafafa]'} ${isPlaying && 'text-theme'}`}>
          <BsFillPlayFill />
        </div>
        <div onClick={() => setMetronomeOpen(!metronomeOpen)} class={`relative w-7 h-7 ${context.dark && 'fill-[#fafafa]'} ${metronomeOpen && 'fill-theme'}`}>
          <MetronomeIcon />
        </div>
        {metronomeOpen && <PlayBox setter={setMetronomeOpen} bpm={bpm} />}
      </div>
      {isPlaying && (
        <figure class='m-0 absolute bottom-12 left-1/2 transform -translate-x-1/2'>
          <audio controls autoPlay ref={audioRef} src="" />
        </figure>
      )}
    </div>
  )
}

export default Song