import { useContext, useState } from "preact/hooks"
import { uploadSongData, uploadSongFile } from "../../../lib/firebase"
// import { StateContext } from "../../app"
import { TimeSignatureType } from "../../types/global"
import toast from 'react-hot-toast';
import { route } from "preact-router";
// import Song from "../../components/Music/SongList"

type Props = {
    path: string
}

const AddMusic = ({path}: Props) => {
//   const context = useContext(StateContext)
  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState<number>(80)
  const [length, setLength] = useState(4)
  const [time_signature, setTime_signature] = useState<TimeSignatureType>('4/4')
  const [audio, setAudio] = useState<File>()
  const isReady = title.length > 0 && bpm && length > 0 && time_signature && audio;
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(false)

  const onComplete = () => {
    route('/music')
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true)
    const songData: Song = {
        title: title,
        bpm: bpm,
        length: length,
        time_signature: time_signature,
        audio_path: String(audio?.name),
        id: String(Date.now())
    }
    await uploadSongData(songData);
    await uploadSongFile(audio as File, toast, loadingPercentage, setLoadingPercentage, onComplete);
  }

  const handleAudioFile = (e: any) => {
    setAudio(e.currentTarget?.files[0])
  }

  return (
    <div class="flex flex-col items-center gap-5 flex-grow w-5/6 mx-auto py-6">
        <h2 class="text-lg">曲を追加 / 編集</h2>
        <div className="flex flex-col items-center gap-2 rounded-sm shadow-lg py-2">
            <p className="font-bold">曲を追加</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-2 px-3 w-full">
                <label htmlFor="title" className="w-full flex items-center pr-2">
                    タイトル
                    <input onChange={e => setTitle(e.currentTarget.value)} value={title} type="text" id="title" name="title" className="ml-auto w-1/2" />
                </label>
                <label htmlFor="bpm" className="w-full flex items-center pr-2">
                    BPM(テンポ)
                    <input onChange={e => setBpm(e.currentTarget.valueAsNumber)} value={bpm} type="number" id="bpm" name="bpm" className="ml-auto w-1/2" />
                </label>
                <label htmlFor="length" className="w-full flex items-center pr-2">
                    曲の長さ(分単位)
                    <input onChange={e => setLength(parseInt(e.currentTarget.value))} value={length} type="number" id="length" name="length" className="ml-auto w-1/2" />
                </label>
                <label htmlFor="time_signature" className="w-full flex items-center pr-2">
                    拍子
                    <select onChange={e => setTime_signature(e.currentTarget.value as TimeSignatureType)} value={time_signature} name="time_signature" id="time_signature" className="ml-auto w-1/2">
                        <option value="4/4">4/4</option>
                        <option value="2/2">2/2</option>
                        <option value="2/4">2/4</option>
                        <option value="6/8">6/8</option>
                        <option value="12/8">12/8</option>
                        <option value="3/4">3/4</option>
                        <option value="3/2">3/2</option>
                        <option value="3/8">3/8</option>
                    </select>
                </label>
                <label htmlFor="audio" className="w-full flex items-center pr-2">
                    音源
                    <input 
                        onChange={handleAudioFile}
                        className="ml-auto text-sm" 
                        type="file" 
                        name="audio" 
                        id="audio" 
                        accept=".mp3,.wav"
                    />
                </label>
                <button disabled={!isReady || loading} type="submit" className={`border border-black w-fit rounded-md mx-auto py-1 mt-4 ${!isReady && "text-gray-400 border-gray-400"}`}>追加</button>
            </form>
        </div>

        {/* <div className="flex-1 w-full flex flex-col items-center gap-4">
            {context?.testData?.map((song: Song, i: number) => (
                <Song song={song} id={i} key={i} />
            ))}
        </div> */}
    </div>
  )
}

export default AddMusic