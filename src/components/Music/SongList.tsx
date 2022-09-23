import { route,  } from 'preact-router';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';
import { StateContext } from '../../app';
import MetronomeIcon from './MetronomeIcon';
import PlayBox from './PlayBox';

type Props = {
  song: Song
  id: number
  currentSong?: number | undefined
  setCurrentSong?: Function
}

function Song({song, id}: Props) {
  const firstUpdate = useRef(true);
  const audioRef = useRef(null)
  
  const {currentSong, setCurrentSong, dark} = useContext(StateContext)
  const [bpm, setBpm] = useState(song.bpm)
  const [isPlaying, setIsPlaying] = useState(false)
  const [metronomeOpen, setMetronomeOpen] = useState(false)

  const goToEdit = () => {
    route(`/music/edit?id=${song.id}&bpm=${song.bpm}&length=${song.length}`)
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if(isPlaying) {
      setCurrentSong(song.audio_path);
    }
  }, [isPlaying])

  return (
    <div className={`flex flex-col items-center gap-3 px-6 py-2 w-full rounded-lg border-2 relative`}>
      <h4 className="font-bold">{song.title}</h4>
      <div onClick={goToEdit} className={`absolute right-4 top-3 icon`}>
        <GrEdit />
      </div>
      <div className="flex items-center justify-between space-x-3 h-full w-full">
        <div className="w-4/5">
          <p><span className="font-semibold">{song.bpm}</span> bpm（{song.time_signature}）</p>
          <p>{song.length} 分</p>
        </div>
        <div onClick={() => setIsPlaying(!isPlaying)} className={`relative text-3xl ${dark && 'fill-[#fafafa]'} ${currentSong === song.audio_path && 'text-theme'}`}>
          {currentSong === song.audio_path && isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </div>
        <div onClick={() => setMetronomeOpen(!metronomeOpen)} className={`relative w-7 h-7 ${dark && 'fill-[#fafafa]'} ${metronomeOpen && 'fill-theme'}`}>
          <MetronomeIcon />
        </div>
        {metronomeOpen && <PlayBox setter={setMetronomeOpen} bpm={bpm} />}
      </div>
    </div>
  )
}

export default Song