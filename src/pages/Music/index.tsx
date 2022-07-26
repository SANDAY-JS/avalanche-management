import { Link } from "preact-router"
import { useContext, useState } from "preact/hooks"
import { GrAdd } from 'react-icons/gr'
import Song from "../../components/Music/SongList"
import {StateContext} from '../../app';
// import SearchSong from "../../components/Music/SearchSong"

type Props = {
  path: string
}

function Music({path}: Props) {
  const { songs } = useContext(StateContext)
  const [currentSong, setCurrentSong] = useState<number>()

  return (
    <div class="flex flex-col items-center gap-5 flex-grow w-5/6 mx-auto py-6">
      <div className="flex gap-3 justify-between items-center w-full">
        <h2 class="text-lg underline text-left italic">Song List</h2>
        {/* <SearchSong /> */}
        <div className="flex items-center gap-4">
          <Link href="/music/add">
            <a className={`icon`}>
              <GrAdd />
            </a>
          </Link>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center gap-4">
        {songs?.map((song: Song, i: number) => (
          <Song song={song} id={i} currentSong={currentSong} setCurrentSong={setCurrentSong} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Music