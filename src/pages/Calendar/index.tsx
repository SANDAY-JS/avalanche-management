import { useEffect } from "preact/hooks";
import ApiCalendar from "react-google-calendar-api";

type Props = {
  path: string
}

function Calendar({path}: Props) {
  const config = {
    "apiKey": "AIzaSyAK97__eWpJZlbjoUOPTyxS61o9jvjuPuk",
    "clientId": "198100393345-ch27sl2viin6kpq3ujlqgl498962pnod.apps.googleusercontent.com",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  }
  const apiCalendar = new ApiCalendar(config)

  const handleItemClick = (event: any, name: string):void => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick()
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  }

  const handleCreateEvent = () => {
    const eventFromNow: object = {
      summary: 'Poc Dev From Now',
      time: 480,
    };
  
    apiCalendar.createEventFromNow(eventFromNow)
      .then((result: object) => {
        console.log(result);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  const handleShowEvents = () => {
    apiCalendar.listEvents({
      timeMin: new Date().toISOString(),
      timeMax: new Date().addDays(10).toISOString(),
      showDeleted: true,
      maxResults: 10,
      orderBy: 'updated'
    }).then(({ result }: any) => {
      console.log(result.items);
    });
  }

  const handleDeleteEvent = (eventId: string) => {
    apiCalendar.deleteEvent(eventId).then(console.log);
  }

  const handleGetEvent = (eventId: string) => {
    apiCalendar.getEvent(eventId).then(console.log);
  }

  useEffect(() => {
    // getEvents()
  }, [])

  return (
    <div class="flex items-center justify-center h-full">
      {/* <CalendarBox /> */}
      <button onClick={(e) => handleItemClick(e, 'sign-in')}>
        sign-in
      </button>
      <button onClick={(e) => handleItemClick(e, 'sign-out')}>
        sign-out
      </button>
    </div>
  )
}

export default Calendar