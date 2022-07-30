import { useState } from "preact/hooks"
import SearchSong from "../../components/Music/SearchSong"
import Song from "../../components/Music/SongList"

type Props = {
  path: string
}

const testData: Song[] = [
  {name: 'さがしもの', bpm: 80, time_signature: '1/4', length: 4.5},
  {name: 'Hero', bpm: 148, time_signature: '2/4', length: 4},
]

function Music({path}: Props) {
  const [currentSong, setCurrentSong] = useState<number>()

  return (
    <div class="flex flex-col items-center gap-5 flex-grow w-5/6 mx-auto py-6">
      <div className="flex gap-3 justify-between items-center w-full">
        <h2 class="text-lg underline text-left italic">Song List</h2>
        <SearchSong />
      </div>

      <div className="flex-1 w-full flex flex-col items-center gap-4">
        {testData.map((song, i) => (
          <Song song={song} id={i} currentSong={currentSong} setCurrentSong={setCurrentSong} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Music