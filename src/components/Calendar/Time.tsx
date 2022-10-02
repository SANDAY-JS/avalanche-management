import Times from './Times'

type Props = {
    showTime: boolean
    date: Date
}

function Time({showTime, date}: Props) {
 return (
 <div>
  {showTime ? <Times date={date}/> : null}
 </div>
  )
}

export default Time;