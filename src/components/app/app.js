import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './app.css'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'

export default function App() {
  const [todoData, setTodoDate] = useState([])
  const [filter, setFilter] = useState('all')
  const [initialTimer, setInitialTimer] = useState([])

  const createTodoItem = (label, minutes, seconds) => {
    return {
      label,
      minutes,
      seconds,
      timer: false,
      completed: false,
      date: new Date(),
      id: self.crypto.randomUUID(),
    }
  }

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

    setTodoDate(newArray)
  }

  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text, minutes, seconds)
    const newArray = [...todoData, newItem]

    setTodoDate(newArray)
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodoDate(toggleProperty(todoData, id, 'completed'))
  }

  const onToggleTimer = (id, value) => {
    const idx = todoData.findIndex((el) => el.id === id)

    const oldItem = todoData[idx]
    const newItem = { ...oldItem, timer: value }

    return setTodoDate([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)])
  }

  const toggleTimer = (newArr) => {
    setInitialTimer(newArr)
  }

  const toggleFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const clearCompleted = () => {
    const newArray = todoData.filter((item) => !item.completed)
    setTodoDate(newArray)
  }

  const editingItem = (label, id) => {
    const newArray = todoData.map((el) => {
      if (el.id === id) el.label = label
      return el
    })
    setTodoDate(newArray)
  }

  const visibleItems = toggleFilter(todoData, filter)

  const completedCount = todoData.filter((el) => el.completed).length

  const todoCount = todoData.length - completedCount

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onItemEditing={editingItem}
          onToggleTimer={onToggleTimer}
          initialTimer={initialTimer}
          setInitialTimer={toggleTimer}
        />
        <Footer
          itemsLeft={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

App.defaultProps = {
  todoData: [],
}

App.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  label: PropTypes.string,
  todoCount: PropTypes.number,
  createTodoItem: PropTypes.func,
}
