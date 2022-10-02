import { useState } from "preact/hooks"

type Props = {
    date: Date
}

const time = ['08:00','09:00','10:00','14:00','15:00']

function Times({date}: Props) {

 const [event, setEvent] = useState(null)
 const [info, setInfo] = useState(false)

 function displayInfo(e: any) {
   setInfo(true);
   setEvent(e.target.innerText);
}

return (
 
 <div className="times">
   {time.map(times => {
    return (
    <div>
      <button onClick={(e)=> displayInfo(e)}> {times} </button>
    </div>
        )
     })}
    <div>
      {info ? `Your appointment is set to ${event} ${date.toDateString()}` : null}
    </div>
 </div>
  )
}

export default Times;