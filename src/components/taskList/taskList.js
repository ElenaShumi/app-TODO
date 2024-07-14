import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './taskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onItemEditing: PropTypes.func.isRequired,
  }

  render() {
    const { todos, onDeleted, onToggleCompleted, onItemEditing } = this.props

    const elements = todos.map((item) => {
      const { id } = item

      return (
        <Task
          key={id}
          {...item}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onItemEditing={onItemEditing}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
