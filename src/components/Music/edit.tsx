import { useState } from "preact/hooks";
import { BsTrash } from "react-icons/bs";
import { deleteSongData } from "../../../lib/firebase";
import toast from 'react-hot-toast'
import { route } from "preact-router";

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

  const [id, _] = useState(query?.id)
  const [title, setTitle] = useState(query?.title)
  const [bpm, setBpm] = useState(query?.bpm)
  const [length, setLength] = useState(query?.length)
  const [time_signature, setTimeSignature] = useState(query?.time_signature)
  const [audioPath, setAudioPath] = useState(query?.audio_path)

  const handleDelete = async () => {
    if(!confirm(title+'を削除しますか？')) return;
    await deleteSongData(id, onComplete)
  }

  const onComplete = () => {
    toast.success('削除が完了しました！')
    route('/music')
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full pt-5">
      <h2>{title} を編集</h2>
      <div className="flex flex-col items-start gap-2 w-3/4 py-3 px-10 rounded-md border mx-auto">
        <h3 className="font-bold text-center w-full">{title}</h3>
        <p><span class="font-semibold">{bpm}</span> bpm（{time_signature}）</p>
        <p>{length} 分</p>
        <div className="flex justify-between w-full">
          <span>ファイル</span>
          <p>{audioPath}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        削除する
        <div onClick={handleDelete} className="text-red-500 text-2xl">
          <BsTrash />
        </div>
      </div>
    </div>
  )
}

export default EditSong