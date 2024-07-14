import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'
import TasksFilter from '../tasksFilter'

function Footer({ itemsLeft, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left </span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  itemsLeft: 0,
  filter: 'all',
}

Footer.propTypes = {
  filter: PropTypes.string,
  itemsLeft: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
