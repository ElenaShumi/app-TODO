import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './taskList.css'

const TaskList = ({
  todos,
  onDeleted,
  onToggleCompleted,
  onItemEditing,
  onToggleTimer,
  initialTimer,
  setInitialTimer,
}) => {
  const elements = todos.map((item) => {
    const { id } = item

    return (
      <Task
        key={id}
        {...item}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleTimer={onToggleTimer}
        onItemEditing={onItemEditing}
        initialTimer={initialTimer}
        setInitialTimer={setInitialTimer}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onItemEditing: PropTypes.func.isRequired,
}

export default TaskList
