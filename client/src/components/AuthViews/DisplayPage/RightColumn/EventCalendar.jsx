import "react-big-calendar/lib/css/react-big-calendar.css";
//import "./myCalendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer, Views, Navigate} from "react-big-calendar";
import Agenda from "./PersonalEvents";
import { useState, useEffect, useMemo, useContext} from "react";
import axios from "axios";
import "./EventCalendar.css";
import { EventViewer } from "./EventViewer";
import PersonalEvents from "./PersonalEvents";


const locales = {
  "en-US": require("date-fns"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const view = {
  day: true,
  agenda: true,
  MyEvents: PersonalEvents
};

export const EventCalendar = () => {

  const [events, setEvents] = useState();
  const [open, setOpen] = useState(false);
  const [focusedEvent, setFocusedEvent] = useState(null);

  useEffect(() => {
    async function getData() {
      const url = "http://localhost:3001/posts/all/events";
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      function eventDateFormat() {
        response.data.forEach((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        });
      }
      eventDateFormat();
      console.log(response.data)
      setEvents(response.data);
    }
    getData();
  }, []);

  function handleSelectEvent(event) {
    setFocusedEvent(event);
    setOpen(true);
  }

  return (
    <>
      <div className="calendars">
        <div>
          <h1>Today's Events</h1>
          <Calendar
            events={events}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView={Views.DAY}
            style={{ height: 700 }}
            views={view}
            onSelectEvent={handleSelectEvent}
            className = "event_calendar"
            messages={{ MyEvents: 'MyEvents' }}
          />
          <EventViewer open={open} setOpen={setOpen} event={focusedEvent} />
        </div>
      </div>
    </>
  );
};
