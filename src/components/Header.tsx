import { useContext } from "preact/hooks"
import { StateContext } from "../app"

function Header() {
  const context = useContext(StateContext)
  
  return (
    <div class={`sticky top-0 flex items-center justify-center w-full py-3 shadow-md ${context.dark && 'bg-[#1a1a1a]'} z-50`}>
        <h1 class="text-lg"><span class='text-theme italic font-bold'>AVALANCHE</span> 練習管理</h1>
    </div>
  )
}

export default Header