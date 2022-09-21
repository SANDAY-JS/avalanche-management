import { useEffect, useState } from "preact/hooks";
import { BsTrash } from "react-icons/bs";
import { deleteSongData, editSongData, getSongDataById, updateSongFile } from "../../../lib/firebase";
import toast from 'react-hot-toast'
import { route } from "preact-router";
import { FiEdit } from "react-icons/fi";
import { TimeSignatureType } from "../../types/global";

interface QueryString {
  [key: string]: string;
}
type Props = {
  path?: string;
}

const EditSong = ({path}: Props) => {
  const query = String(location.href)
    .split('?')[1]
    .split('&')
    .map((str) => [str.split('=')[0], str.split('=')[1]])
    .reduce((acc, a) => {
      acc[a[0]] = a[1];
      return acc;
    }, {} as QueryString);

  const [loading, setLoading] = useState<boolean>(false);
  const [isEditting, setIsEditting] = useState(false);

  const [data, setData] = useState<Song>();
  const [id, _] = useState(query?.id)
  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState<number>(parseInt(query?.bpm))
  const [length, setLength] = useState<number>(parseInt(query?.length))
  const [time_signature, setTimeSignature] = useState<TimeSignatureType>('4/4')
  const [audioPath, setAudioPath] = useState('')
  const [audio, setAudio] = useState<File>()

  const handleAudioFile = (e: any) => {
    setAudio(e.currentTarget?.files[0])
  }

  const handleDelete = async () => {
    if(!confirm(title+'を削除しますか？')) return;
    await deleteSongData(id, onComplete)
  }

  const onComplete = () => {
    toast.success('削除が完了しました！')
    route('/music')
  }

  const fetchSong = async (): Promise<void | Song> => {
    await getSongDataById(id, setData);
  }

  const compareOriginNew = (newData: SongWithId): SongWithId => {
    if(!data) throw Error();
    const keys = Object.keys(newData);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof Song;
      if(newData[key] === data[key] || !newData[key]) {
        delete newData[key];
      }
    }
    newData.id = id;
    return newData;
  }

  const handleSubmit = async (e:Event) => {
    e.preventDefault();
    const loadingId = toast.loading('更新中...')
    setLoading(true);
    const newData: Song = {
      title: title,
      bpm: bpm,
      length: length,
      time_signature: time_signature,
      audio_path: audioPath,
      id: id
    }
    const updatedData = compareOriginNew(newData)

    if(audio) {
      await updateSongFile(audio, audioPath);
    }
    
    await editSongData(updatedData)
      .then(() => {
        toast.dismiss(loadingId)
        toast.success(`${title}の情報を更新しました!`)
        setLoading(false);
        route('/music')
      })
      .catch((err) => {
        toast.dismiss(loadingId)
        toast.error('更新に失敗しました...')
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchSong();
  }, [])

  useEffect(() => {
    if(!data) return;
    setTitle(data.title)
    setBpm(data.bpm)
    setLength(data.length)
    setAudioPath(data.audio_path)
    setTimeSignature(data.time_signature)
  }, [data])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10 w-full pt-5 m-0">
      <div className="flex items-center gap-5">
        <div disabled={!data} onClick={() => setIsEditting(!isEditting)} className="text-green-500 text-2xl flex flex-col items-center">
          <FiEdit />
          <span className="text-black text-xs">編集</span>
        </div>
        <div disabled={!data} onClick={handleDelete} className="text-red-500 text-2xl flex flex-col items-center">
          <BsTrash />
          <span className="text-black text-xs">削除</span>
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2 w-3/4 py-3 px-10 rounded-md border mx-auto">
        {!isEditting ? 
          <h3 className="font-bold text-center w-full">{title}</h3> :
          <label htmlFor="title" className="w-full flex items-center" >
            タイトル
            <input onChange={e => setTitle(e.currentTarget.value)} type="text" name="title" value={title} className="ml-auto w-1/2 pl-2" />
          </label>
        }
        {!isEditting ? 
          <p><span class="font-semibold">{bpm}</span> bpm（{time_signature}）</p> 
            :
          <div className="flex flex-col">
            <label htmlFor="bpm" className="w-full flex mb-2" >
              bpm 
              <input onChange={e=>setBpm(e.currentTarget.valueAsNumber)} type="number" name="bpm" id="bpm" value={bpm} className="ml-auto w-1/2 pl-2" />
            </label>
            <label htmlFor="time_signature" className="w-full flex items-center pr-2">
                拍子
                <select onChange={e => setTimeSignature(e.currentTarget.value as TimeSignatureType)} value={time_signature} name="time_signature" id="time_signature" className="ml-auto w-1/2">
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
          </div>
        }
        {!isEditting ? <p>{length} 分</p> : 
         <label htmlFor="length" className="w-full flex items-center" >
            曲の長さ
            <input onChange={e=>setLength(e.currentTarget.valueAsNumber)} type="number" name="length" id="length" value={length} className="ml-auto w-1/2 pl-2" />
         </label>
        }
        {!isEditting ? 
          <div className="flex justify-between w-full">
            <span>ファイル</span>
            <p>{audioPath}</p>
          </div> :
          <input 
            onChange={handleAudioFile}
            type="file" 
            name="audio" 
            id="audio" 
            accept=".mp3,.wav"
          />
        }
        {isEditting && <button disabled={loading} className="mx-auto border bg-green-300 py-1 rounded-sm mt-3">完了</button>}
      </div>
    </form>
  )
}

export default EditSong