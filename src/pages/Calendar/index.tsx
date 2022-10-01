import CalendarBox from "../../components/Calendar/CalendarBox"

type Props = {
  path: string
  data?: any
}

function Calendar({path, data}: Props) {
  console.log('data', data)
  return (
    <div class="flex items-center justify-center h-full">
      <CalendarBox />
    </div>
  )
}

export default Calendar

export async function getStaticProps () {
  const data = await fetch('/api/calender');

  return {
    props: {
      data
    }
  }
}