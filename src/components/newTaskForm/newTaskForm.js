import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  static propTypes = {
    label: PropTypes.string,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
        />
      </form>
    )
  }
}
