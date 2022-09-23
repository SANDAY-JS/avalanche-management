type Props = {
    currentSongAsUrl: string;
}
const PlayMusic = ({currentSongAsUrl}: Props) => {
  return (
    <figure class='fixed bottom-16 left-1/2 transform -translate-x-1/2 m-0'>
        <audio controls autoPlay src={currentSongAsUrl} />
    </figure>
  )
}

export default PlayMusic