import { useRef, useState } from 'preact/hooks';
import Metronome from '@kevinorriss/react-metronome'
import { useClickOutside } from '../../hooks/useClickOutside';
// import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

type Props = {
    setter: Function;
    bpm: number;
}

const PlayBox = ({setter, bpm}: Props) => {
    const domRef = useRef(null)
    useClickOutside(domRef, () => setter(false));

    const [frequency, setFrequency] = useState<number>(440);

  return (
    <div ref={domRef} class="w-3/4 py-2 flex flex-col items-center justify-center gap-6 rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Metronome 
          frequency={frequency}
          startBpm={bpm} 
          bpmTagStyle={{display: 'none'}} 
          plusStyle={{backgroundColor: 'rgb(248 113 113)'}} 
          minusStyle={{backgroundColor: 'rgb(248 113 113)'}}
          playPauseStyle={{width: '3rem', height: '3rem', backgroundColor: 'rgb(248 113 113)'}} 
        />
        {/* <div className="flex mx-auto gap-2 items-center justify-center">
          <p>音の高さ</p>
          <div className="flex flex-col items-center text-lg">
            <div onClick={() => setFrequency(frequency + 20)}>
              <BsFillCaretUpFill />
            </div>
            <div onClick={() => setFrequency(frequency - 20)}>
              <BsFillCaretDownFill />
            </div>
          </div>
        </div> */}
    </div>
  )
}

export default PlayBox