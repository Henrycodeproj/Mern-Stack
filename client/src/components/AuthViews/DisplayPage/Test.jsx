import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


function Test() {

  const events = [
      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
  ]  
  function p (e) {
    console.log(e)
  }
  const header = {
    end: 'prev,next'
  }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        initialEvents = {events}
        eventContent={renderEventContent}
        eventClick = {(e)=> p(e)}
        editable = {false}
        headerToolbar = {header}
        height = "500px"
        dayMaxEvents = {true}
        eventMaxStack = {true}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
  console.log(eventInfo)
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}


export default Test