import { BsPerson } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiMusic } from 'react-icons/fi';
import { Link } from 'preact-router';

function MenuBar() {
  return (
    <div class="fixed bottom-0 flex items-center justify-around w-full h-14 px-2 rounded-t-2xl shadow-inner">
        <Link href='/calendar'>
            <div class="flex-1 flex justify-center items-center h-full  text-2xl text-[#242424] active:text-theme">
                <AiOutlineCalendar className='mx-4 my-2' />
            </div>
        </Link>
        <Link href='/music'>
            <div class="flex-1 flex justify-center items-center h-full  text-2xl text-[#242424] active:text-theme">
                <FiMusic className='mx-4 my-2' />
            </div>
        </Link>
        <Link href='/account'>
            <div class="flex-1 flex justify-center items-center h-full  text-2xl text-[#242424] active:text-theme">
                <BsPerson className='mx-4 my-2' />
            </div>
        </Link>
    </div>
  )
}

export default MenuBar