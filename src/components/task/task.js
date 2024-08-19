import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import Timer from '../timer'

const Task = ({
  id,
  onItemEditing,
  label: labelProps,
  timer,
  onDeleted,
  onToggleCompleted,
  onToggleTimer,
  completed,
  date,
  minutes,
  seconds,
  initialTimer,
  setInitialTimer,
}) => {
  const [label, setLabel] = useState('')
  const [editing, setEditing] = useState(false)

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

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
            minutes={minutes}
            seconds={seconds}
            timerProps={timer}
            onToggleTimer={onToggleTimer}
            id={id}
            initialTimer={initialTimer}
            setInitialTimer={setInitialTimer}
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
