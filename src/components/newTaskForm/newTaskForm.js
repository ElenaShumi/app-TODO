import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value.trimLeft())
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label, minutes, seconds)
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        required
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
      <input
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={seconds}
        onChange={onSecondsChange}
      />
      <button type="submit"></button>
    </form>
  )
}

NewTaskForm.propTypes = {
  label: PropTypes.string,
}

export default NewTaskForm
