import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./EventCalendar.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Truncating } from "../../ReusablesComponents/Truncating"


export const EventCalendar = () => {

  const event = {
    events: [
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
        { title: 'grape', start: '2023-01-17T01:02:00.301Z' },
        { title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis adipisci cum soluta repellat quia nihil deleniti accusantium, illum mollitia aut doloremque itaque esse omnis fugiat!', start: '2023-01-15T01:02:00.301Z' },
    ],
  }
  function changeDefaultName (event) { 
    return event.text = event.shortText
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
        initialEvents = {event}
        eventContent = {renderEventContent}
        editable = {false}
        headerToolbar = {header}
        height = "400px"
        dayMaxEvents = {0}
        moreLinkClassNames = {changeDefaultName}
        eventMaxStack = {-1}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
    return (
      <>
        <div style = {{padding:"5px", width:"100%"}}>
        <div className = "see">
        <h3 style = {{marginRight:"5px", width:"100%", display:"inline", color:"black"}}>
          {eventInfo.timeText}
        </h3>
        <FavoriteBorderIcon sx = {{fontSize:"18px"}}/>
        </div>
        <p style = {{textTransform:"capitalize", width:"100%"}}>
            <Truncating
            postDescription={eventInfo.event.title}
            truncateNumber = {25}
            />
        </p>
        </div>
      </>
    )
}