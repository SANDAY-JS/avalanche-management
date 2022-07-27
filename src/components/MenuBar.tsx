import { BsPerson } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiMusic } from 'react-icons/fi';
import { Link } from 'preact-router';
import { useContext } from 'preact/hooks';
import { StateContext } from '../app';

function MenuBar() {
  const context = useContext(StateContext)

  return (
    <div class={`fixed bottom-0 flex items-center justify-around w-full h-14 px-2 rounded-t-3xl shadow-inner ${context.dark && 'bg-[#1a1a1a]'}`}>
        <Link href='/calendar'>
            <div class={`flex-1 flex justify-center items-center h-full text-2xl ${context.dark ? 'text-[#fafafa]' : 'text-[#242424]'} active:text-theme`}>
                <span class='mx-4 my-2'><AiOutlineCalendar /></span>
            </div>
        </Link>
        <Link href='/music'>
            <div class={`flex-1 flex justify-center items-center h-full text-2xl ${context.dark ? 'text-[#fafafa]' : 'text-[#242424]'} active:text-theme`}>
                <span class='mx-4 my-2'><FiMusic /></span>
            </div>
        </Link>
        <Link href='/'>
            <div class={`flex-1 flex justify-center items-center h-full text-2xl ${context.dark ? 'text-[#fafafa]' : 'text-[#242424]'} active:text-theme`}>
                <span class='mx-4 my-2'><BsPerson /></span>
            </div>
        </Link>
    </div>
  )
}

export default MenuBar