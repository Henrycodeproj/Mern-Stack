import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef } from 'react';


function Test() {
  const ref = useRef()

  const event = {
    events: [
        { title: 'pool', start: '2023-01-13T01:02:00.301Z', backgroundColor:"red" },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
    ],
    color:"blue"
  }
    
  function p (e) {
    console.log(ref)
    //console.log(e)
  }
  const header = {
    end: 'prev,next'
  }
  const z =   {
    dayMaxEventRows: true, // for all non-TimeGrid views
  views: {
    dayGrid: {
      dayMaxEventRows: 2 // adjust to 6 only for timeGridWeek/timeGridDay
    }
  }
}
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        initialEvents = {event}
        eventClick = {(e)=> p(e)}
        eventContent = {renderEventContent}
        editable = {false}
        headerToolbar = {header}
        height = "400px"
        dayMaxEvents = {true}
        ref = {ref}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
  console.log(eventInfo)
    return (
      <>
      <div style = {{display:"flex"}}>
        <b style = {{background:"red", marginRight:"5px"}}>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
      </>
    )
}


export default Test