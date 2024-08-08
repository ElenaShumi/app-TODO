import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
  static defaultProps = {
    label: '',
    date: new Date(),
    completed: false,
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    label: PropTypes.string,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onItemEditing: PropTypes.func.isRequired,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }

  state = {
    label: '',
    editing: false,
    minutes: null,
    seconds: null,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  componentDidMount() {
    this.onTime(this.props.minutes, this.props.seconds)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { id, onItemEditing } = this.props

    onItemEditing(this.state.label, id)

    this.setState({
      label: '',
      editing: false,
    })
  }

  onToggleEditing = () => {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
        label: this.props.label,
      }
    })
  }

  onTime = (minutes, seconds) => {
    this.setState({
      minutes,
      seconds,
    })
  }

  #interval
  startTimer = () => {
    clearInterval(this.#interval)

    const { minutes, seconds } = this.state
    let end
    if (!this.props.endTimer) {
      end = Date.now() + minutes * 1000 * 60 + seconds * 1000
    } else end = this.props.endTimer

    this.#interval = setInterval(() => {
      const now = Date.now()
      const delta = end - now
      if (delta < 0) {
        clearInterval(this.#interval)
        return
      }
      this.setState({
        minutes: Math.floor(delta / 1000 / 60),
        seconds: Math.floor((delta % 60000) / 1000),
        endTimer: end,
      })
    }, 500)
  }

  pauseTimer = () => {
    clearInterval(this.#interval)
    const { onToggleTimer, onToggleEndTimer, id } = this.props
    onToggleTimer(id, false)
    onToggleEndTimer(id, null)
  }

  componentWillUnmount() {
    clearInterval(this.#interval)
    this.props.onToggleEndTimer(this.props.id, this.state.endTimer)
  }

  timeFormatting(time) {
    if (!time) return '00'
    else if (time < 10) return `0${time}`
    else return time
  }

  render() {
    const { label, id, timer, onDeleted, onToggleCompleted, completed, date, onToggleTimer } = this.props

    const { editing, minutes, seconds } = this.state

    if (timer) {
      this.startTimer()
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
            <span className="title"> {label} </span>
            <span className="description">
              <button className="icon icon-play" onClick={() => onToggleTimer(id, true)}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              {` ${this.timeFormatting(minutes)}:${this.timeFormatting(seconds)} `}
            </span>
            <span className="description">{`created ${formatDistanceToNow(date, { includeSeconds: true })}`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={this.state.label} onChange={this.onLabelChange}></input>
        </form>
      </li>
    )
  }
}
