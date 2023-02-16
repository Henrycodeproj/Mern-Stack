import React, {useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'

export default function CustomWeekView({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => CustomWeekView.range(date, { localizer }),
    [date, localizer]
  )
  console.log(props.events,'1', new Date("2023-02-17T03:24:00"))
  props.events = [  
    {
      'title': 'All Day Event very long title',
      'allDay': true,
      'start': new Date(2023, 1, 15),
      'end': new Date(2023, 1, 15),
      'id': "63e30dec0270cbb8eba66cd2"
    },
    {
      'title': 'Long Event',
      'start': new Date("2023-02-17T03:24:00"),
      'end': new Date("2023-02-17T04:24:00"),
      'id': "63e30dec0270cbb8eba66cd2",
      'original_poster' : [{_id: '637006051cc69b448ad1f065', username: 'Henry', password: '$2b$10$3wPwI7XNRdS9lxAQOUa6veVdznjNcr.8u86LWLXVC9bJ0Tl/4DMqy', email: 'test@test.edu', selfDescription: ''}]
    }
  ]
  console.log(props.events, '2')
  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      onClick = {e => console.log(e)}
      {...props}
    />
  )
}

CustomWeekView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

CustomWeekView.range = (date, { localizer }) => {
  const start = date
  const end = localizer.add(start, 2, 'day')

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

CustomWeekView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

CustomWeekView.title = (date, { localizer }) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}