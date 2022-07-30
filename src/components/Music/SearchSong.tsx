import { useState } from 'preact/hooks';
import { FiSearch } from "react-icons/fi"
import { MdOutlineCancel } from "react-icons/md"

function SearchSong() {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const handleSubmit = (e: Event) => {
        e.preventDefault()
    }

  return (
    <form class='mr-2 text-xl' onSubmit={handleSubmit}>
        <div class='relative' onClick={() => setIsSearching(!isSearching)}>
            {!isSearching ? 
                <FiSearch /> : 
                <span class='absolute top-1 right-1 text-red-500'><MdOutlineCancel /></span> }
        </div>
        {isSearching && <input type="text" class='outline-none rounded-md px-2' onChange={(e) => setText(String(e.currentTarget))} />}
    </form>
  )
}

export default SearchSong