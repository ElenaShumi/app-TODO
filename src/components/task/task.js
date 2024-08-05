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
    minutes: '00',
    seconds: null,
    timer: null,
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

  // startTimer = () => {
  //   const { minutes, seconds } = this.state
  //   let secLeft
  //   let timer = setInterval(() => {
  //     if (seconds !== 0) {
  //       let secLeft = seconds - 1
  //     } else if (seconds === 0 && minutes !== 0) {
  //       let minLeft = minutes - 1
  //     }
  //     this.setState({
  //       seconds: secLeft,
  //     })
  //     if (seconds === 0 && minutes === 0) {
  //       clearInterval(timer)
  //     }
  //   }, 1000)
  //   this.setState({
  //     minutes: minLeft,
  //     seconds: '59',
  //   })
  // }

  // startTimer = (timeLeft) => {
  //   clearInterval(this.state.timer)
  //   let timer = setInterval(() => {
  //     var timeLeft = this.state.seconds - 1
  //     if (timeLeft === 0) {
  //       clearInterval(timer)
  //     }
  //     this.setState({
  //       seconds: timeLeft,
  //     })
  //   }, 1000)
  //   return this.setState({ seconds: timeLeft, timer: timer })
  // }

  render() {
    const { label, id, onDeleted, onToggleCompleted, completed, date } = this.props
    const { editing, minutes, seconds } = this.state
    // console.log('56' - 1)
    // console.log(seconds + 'S')
    return (
      <li className={completed ? 'completed' : editing ? 'editing' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} id={`checkbox ${id}`} />
          <label htmlFor={`checkbox ${id}`}>
            <span className="title"> {label} </span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause"></button>
              {`${minutes}:${seconds}`}
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
