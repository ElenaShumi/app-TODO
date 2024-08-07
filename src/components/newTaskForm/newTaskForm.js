import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    label: PropTypes.string,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value.trimLeft(),
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { label, minutes, seconds } = this.state
    e.preventDefault()
    this.props.onItemAdded(label, minutes, seconds)
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          required
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.minutes}
          onChange={this.onMinutesChange}
        />
        <input
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.seconds}
          onChange={this.onSecondsChange}
        />
        <button type="submit"></button>
      </form>
    )
  }
}
