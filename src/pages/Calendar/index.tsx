import CalendarBox from "../../components/Calendar/CalendarBox"

type Props = {
  path: string
}

function Calendar({path}: Props) {

  return (
    <div class="flex items-center justify-center h-full">
      <CalendarBox />
    </div>
  )
}

export default Calendar