import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './app.css'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'

export default class App extends Component {
  maxId = 1

  static defaultProps = {
    todoData: [],
  }

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    label: PropTypes.string,
    todoCount: PropTypes.number,
    createTodoItem: PropTypes.func,
  }

  state = {
    todoData: [],
    filter: 'all',
  }

  createTodoItem(label, minutes, seconds) {
    return {
      label,
      minutes,
      seconds,
      completed: false,
      date: new Date(),
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds)

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      }
    })
  }

  filter(items, filter) {
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

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.completed)

      return {
        todoData: newArray,
      }
    })
  }

  editingItem = (label, id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) el.label = label
        return el
      })

      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const visibleItems = this.filter(todoData, filter)

    const completedCount = todoData.filter((el) => el.completed).length

    const todoCount = todoData.length - completedCount

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onItemEditing={this.editingItem}
          />
          <Footer
            itemsLeft={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
