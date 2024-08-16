import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import Timer from '../timer'

const Task = ({
  id,
  onItemEditing,
  // endTimer,
  toggleTime,
  label: labelProps,
  timer,
  onDeleted,
  onToggleCompleted,
  onToggleTimer,
  completed,
  date,
  minutes: minutesProps,
  seconds: secondsProps,
}) => {
  const [label, setLabel] = useState('')
  const [editing, setEditing] = useState(false)
  // const [minutes, setMinutes] = useState(null)
  // const [seconds, setSeconds] = useState(null)
  // // const [endTimerState, setEndTimerState] = useState(null)

  // let interval

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  // useEffect(() => {
  //   onTime(minutesProps, secondsProps)
  // }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    onItemEditing(label, id)
    setLabel('')
    setEditing(false)
  }

  const onToggleEditing = () => {
    setEditing(!editing)
    setLabel(labelProps)
  }

  // const onTime = (minutes, seconds) => {
  //   setMinutes(minutes)
  //   setSeconds(seconds)
  // }

  // const startTimer = () => {
  //   clearInterval(interval)

  //   let end
  //   if (!endTimer) {
  //     end = Date.now() + minutes * 1000 * 60 + seconds * 1000
  //   } else end = endTimer

  //   interval = setInterval(() => {
  //     const now = Date.now()
  //     const delta = end - now
  //     if (delta < 0) {
  //       clearInterval(interval)
  //       return
  //     }
  //     setMinutes(Math.floor(delta / 1000 / 60))
  //     setSeconds(Math.floor((delta % 60000) / 1000))
  //     // setEndTimerState(end)
  //   }, 500)
  // }

  // const pauseTimer = () => {
  //   clearInterval(interval)
  //   onToggleTimer(id, false)
  //   onToggleEndTimer(id, null)
  // }

  // useEffect(() => {
  //   return () => {
  //     clearInterval(interval)
  //     onToggleEndTimer(id, endTimerState)
  //   }
  // }, [])

  // const timeFormatting = (time) => {
  //   if (!time) return '00'
  //   else if (time < 10) return `0${time}`
  //   else return time
  // }

  // if (timer) {
  //   startTimer()
  // }

  return (
    <li className={completed ? 'completed' : editing ? 'editing' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleCompleted}
          id={`checkbox ${id}`}
          defaultChecked={completed ? true : false}
        />
        <label htmlFor={`checkbox ${id}`}>
          <span className="title"> {labelProps} </span>
          <Timer
            minutesProps={minutesProps}
            secondsProps={secondsProps}
            timerProps={timer}
            onToggleTimer={onToggleTimer}
            toggleTime={toggleTime}
            id={id}
          />
          <span className="description">{`created ${formatDistanceToNow(date, { includeSeconds: true })}`}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" value={label} onChange={onLabelChange}></input>
      </form>
    </li>
  )
}

Task.defaultProps = {
  label: '',
  date: new Date(),
  completed: false,
}

Task.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  label: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onItemEditing: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
}

export default Task
