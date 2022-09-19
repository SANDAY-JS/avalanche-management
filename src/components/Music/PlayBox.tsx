import { useRef } from 'preact/hooks';
import Metronome from '@kevinorriss/react-metronome'
import { useClickOutside } from '../../hooks/useClickOutside';

type Props = {
    setter: Function;
    bpm: number;
}

const PlayBox = ({setter, bpm}: Props) => {
    const domRef = useRef(null)
    useClickOutside(domRef, () => setter(false));

  return (
    <div ref={domRef} class="w-3/4 py-2 flex items-center justify-center rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Metronome startBpm={bpm} playPauseStyle={{width: '3rem', height: '3rem', backgroundColor: 'rgb(248 113 113)'}} bpmTagStyle={{display: 'none'}} plusStyle={{backgroundColor: 'rgb(248 113 113)'}} minusStyle={{backgroundColor: 'rgb(248 113 113)'}} />
    </div>
  )
}

export default PlayBox