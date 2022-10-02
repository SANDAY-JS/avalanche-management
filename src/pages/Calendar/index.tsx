import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "preact/hooks";
import ApiCalendar from "react-google-calendar-api";
import { gapi } from 'gapi-script';
import dayGridPlugin from "@fullcalendar/daygrid";

type Props = {
  path: string
}

function Calendar({path}: Props) {
  const [events, setEvents] = useState(null);

  const config = {
    apiKey: "AIzaSyAK97__eWpJZlbjoUOPTyxS61o9jvjuPuk",
    clientId: "198100393345-ch27sl2viin6kpq3ujlqgl498962pnod.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  }
  const apiCalendar = new ApiCalendar(config)

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const openSignInPopup = () => {
    gapi.auth2.authorize(
               { client_id: config.clientId, scope: config.scope },
               (res:any) => {
                 if (res) {
                   if (res.access_token)
                     localStorage.setItem("access_token", res.access_token);
 
                   // Load calendar events after authentication
                   gapi.client.load("calendar", "v3", listUpcomingEvents);
                 }
               }
             );
 }  
 
 const initClient = () => {
     if (!localStorage.getItem("access_token")) {
       openSignInPopup();
     } else {
       // Get events if access token is found without sign in popup
       fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${config.apiKey}&orderBy=startTime&singleEvents=true`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
           },
         }
       )
         .then((res) => {
           // Check if unauthorized status code is return open sign in popup
           if (res.status !== 401) {
             return res.json();
           } else {
             localStorage.removeItem("access_token");
 
             openSignInPopup();
           }
         })
         .then((data) => {
           if (data?.items) {
             setEvents(formatEvents(data.items));
           }
         });
     }
   };

   const listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        // Fetch events from user's primary calendar
        calendarId: "primary",
        showDeleted: true,
        singleEvents: true,
      })
      .then(function (response:any) {
        let events = response.result.items;

        if (events.length > 0) {
          setEvents(formatEvents(events));
        }
      });
  };

  const formatEvents = (list:any) => {
    return list.map((item:any) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const addEvent = () => {
    if (gapi.client || localStorage.getItem("access_token")) {
      let today = new Date();

      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${config.apiKey}&timeMax=${new Date(
          "Apr 14, 2021"
        ).toISOString()}&timeMin=${new Date("Apr 15, 2021").toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
      //   fetch(
      //     `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //       },
      //       body: JSON.stringify({
      //         end: {
      //           dateTime: new Date("Apr 16, 2021"),
      //         },
      //         start: {
      //           dateTime: new Date("Apr 15, 2021"),
      //         },
      //         summary: "Test",
      //       }),
      //     }
      //   );
    }
  };


  const handleItemClick = (event: any, name: string):void => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick()
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    } else if (name === 'show') {
      handleShowEvents();
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

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleShowEvents = () => {
    apiCalendar.listEvents({
      timeMin: new Date().toISOString(),
      timeMax: addDays(new Date(), 10).toISOString(),
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
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (gapi) handleClientLoad();
    });
  }, []);

  return (
    <div class="flex items-center justify-center h-full">
      {/* <CalendarBox /> */}
      <button onClick={(e) => handleItemClick(e, 'sign-in')}>
        sign-in
      </button>
      <button onClick={addEvent}>Add event</button>
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </div>
  )
}

export default Calendar