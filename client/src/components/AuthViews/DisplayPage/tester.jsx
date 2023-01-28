import "react-big-calendar/lib/css/react-big-calendar.css";
//import "./myCalendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { useState } from "react"

const locales = {
	"en-US": require("date-fns")
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
});

const view = {
    day: true,
    agenda:true
  }
  

export const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            id: 0,
            title: "training",
            start: new Date(2023, 0, 27, 9, 0, 0),
            end: new Date(2023, 0, 27, 13, 0, 0),
            resourceId: 1
        },
    ])

    function call() {
        const t = {
            id: 2,
            title: "cooking",
            start: new Date(2023, 0, 27, 9, 0, 0),
            end: new Date(2023, 0, 27, 9, 0, 0),
            resourceId: 2
        }
        setEvents(prev => [t, ...prev])
        setTimeout(() => {
            console.log(events)
        }, 3000);
    }
    function handleSelectEvent(event) {
        const d =new Date(event.end)
        alert(event.title)
    }
    return (
	    <>
	    	<div className="calendars">
	    		<div>
                    <div onClick={() => call()}>button</div>
	    			<h1>Today's Events</h1>
	    			<Calendar
	    				events={events}
	    				localizer={localizer}
	    				defaultDate={new Date()}
                        defaultView = {Views.DAY}
	    				style={{ height: 700 }}
                        views = {view}
                        onSelectEvent={handleSelectEvent}
	    			/>
	    		</div>
	    	</div>
	    </>
    )
}