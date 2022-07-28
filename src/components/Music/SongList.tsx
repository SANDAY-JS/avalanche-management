import Metronome from './Metronome';

type Props = {
  song: Song
  id: number
  currentSong: number | undefined
  setCurrentSong: Function
}

function Song({song, id, currentSong, setCurrentSong}: Props) {

  const changeCurrentSong = () => {
    if(currentSong !== id) return setCurrentSong(id);
    setCurrentSong(undefined)
  }

  return (
    <div class='flex flex-col items-center gap-3 px-6 py-2 shadow-lg w-full rounded-lg'>
      <h4 class="font-bold">{song.name}</h4>
      <div className="flex items-center justify-between space-x-3 h-full w-full">
        <div className="w-4/5">
          <p><span class="font-semibold">{song.bpm}</span> bpm（{song.time_signature}）</p>
          <p>{song.length} 分</p>
        </div>
        {/* <span class="h-12 w-[2px] bg-slate-400 mr-5 " /> */}
        <div onClick={changeCurrentSong} class={`w-7 h-7 ${currentSong === id && 'fill-theme'}`}>
          <Metronome />
        </div>
      </div>
    </div>
  )
}

export default Song