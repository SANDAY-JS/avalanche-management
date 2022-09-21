import { useEffect, useState } from "preact/hooks";
import { BsTrash } from "react-icons/bs";
import { deleteSongData, getSongDataById } from "../../../lib/firebase";
import toast from 'react-hot-toast'
import { route } from "preact-router";
import { FiEdit } from "react-icons/fi";

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

  const [data, setData] = useState<Song>();
  const [id, _] = useState(query?.id)
  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState<number>(parseInt(query?.bpm))
  const [length, setLength] = useState<number>(parseInt(query?.length))
  const [time_signature, setTimeSignature] = useState('')
  const [audioPath, setAudioPath] = useState('')
  const [isEditting, setIsEditting] = useState(false);

  const handleDelete = async () => {
    if(!confirm(title+'を削除しますか？')) return;
    await deleteSongData(id, onComplete)
  }

  const onComplete = () => {
    toast.success('削除が完了しました！')
    route('/music')
  }

  const fetchSong = async (): Promise<void> => await getSongDataById(id, setData);

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
    <div className="flex flex-col items-center gap-10 w-full pt-5">
      <div className="flex items-center gap-5">
        <div onClick={() => setIsEditting(!isEditting)} className="text-green-500 text-2xl flex flex-col items-center">
          <FiEdit />
          <span className="text-black text-xs">編集</span>
        </div>
        <div onClick={handleDelete} className="text-red-500 text-2xl flex flex-col items-center">
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
            <label htmlFor="time_signature" className="w-full flex items-center" >
              拍子 
              <input onChange={e=>setTimeSignature(e.currentTarget.value)} type="number" name="time_signature" id="time_signature" value={time_signature} className="ml-auto w-1/2 pl-2" />
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
          <input type="file" accept="mp3" />
        }
      </div>
    </div>
  )
}

export default EditSong