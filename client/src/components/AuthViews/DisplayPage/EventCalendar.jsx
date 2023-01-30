import "react-big-calendar/lib/css/react-big-calendar.css";
//import "./myCalendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./EventCalendar.css"

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
};

export const EventCalendar = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    async function getData() {
      const url = "http://localhost:3001/posts/all/posts";
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
      setEvents(response.data);
    }
    getData();
  }, []);

  function call() {
    const t = {
      id: 2,
      title: "cooking",
      start: new Date(2023, 0, 29, 9, 0, 0),
      end: new Date(2023, 0, 29, 9, 0, 0),
      resourceId: 2,
    };
    setEvents((prev) => [t, ...prev]);
  }
  function handleSelectEvent(event) {
    const d = new Date(event.end);
    alert(event.title);
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
          />
        </div>
      </div>
    </>
  );
};
