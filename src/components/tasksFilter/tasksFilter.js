import React from 'react'
import PropTypes from 'prop-types'

import './tasksFilter.css'

const TasksFilter = ({ filter, onFilterChange }) => {
  const buttonsArr = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsArr.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : ''

    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}
export default TasksFilter
