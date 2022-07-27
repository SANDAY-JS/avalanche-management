type Props = {
    songs: Song[]
}

function SongList({songs}: Props) {
  return (
    <div>
        {songs.map((song, i) => {
            <div key={i} class='flex items-center px-3 py-1' >
                <p>Song {i+1}</p>
                {/* <p>{song.name}</p> */}
            </div>
        })}
    </div>
  )
}

export default SongList