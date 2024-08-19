import React, { useState, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import './timer.css'

function Timer({ id, minutes, seconds, timerProps, onToggleTimer, initialTimer, setInitialTimer }) {
  const [startAt, setStartAt] = useState()
  const [initTimer, setInitTimer] = useState(0)

  useEffect(() => {
    if (initialTimer.length !== 0) {
      const time = timerSearch(initialTimer)
      setInitTimer(time)
    } else {
      setStartAt()
    }
  }, [])

  function timerSearch(arr) {
    const idx = arr.findIndex((el) => el.id === id)

    if (idx === -1) {
      return 0
    }

    const item = arr[idx]

    if (timerProps) {
      const newTime = now - item.endTime
      return newTime + item.time
    } else return item.time
  }

  const timeSeconds = minutes * 1000 * 60 + seconds * 1000

  const now = useNow(100, startAt)

  const timeFromStart = now - (startAt ?? now)

  const timer = timeFromStart + initTimer

  useEffect(() => {
    return () => {
      const newArr = useNewArr(initialTimer, id, timer, now)
      setInitialTimer(newArr)
    }
  }, [timer])

  const countDown = Math.max(0, timeSeconds - timer)

  const minutesString = String(Math.floor(countDown / 1000 / 60)).padStart(2, '0')
  const secondsString = String(Math.floor((countDown % 60000) / 1000)).padStart(2, '0')

  const toggleTimer = (value) => {
    if (value === 'pause') {
      setInitTimer(timer)
      onToggleTimer(id, false)
      setStartAt()
    } else if (value === 'play') {
      setStartAt(Date.now())
      onToggleTimer(id, true)
    }
  }

  useEffect(() => {
    if (timerProps) {
      toggleTimer('play')
    }
  }, [])

  const isCountEnd = countDown === 0
  useEffect(() => {
    clearInterval()
  }, [isCountEnd])

  return (
    <span className="description">
      <button className="icon icon-play" onClick={() => toggleTimer('play')}></button>
      <button className="icon icon-pause" onClick={() => toggleTimer('pause')}></button>
      {` ${minutesString}:${secondsString} `}
    </span>
  )
}

export default Timer

function useNow(updateInterval, enabled) {
  const [now, setNow] = useState(Date.now())

  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    setNow(Date.now())

    const interval = setInterval(() => {
      setNow(Date.now())
    }, updateInterval)

    return () => {
      clearInterval(interval)
    }
  }, [updateInterval, enabled])
  return now
}

function useNewArr(arr, id, time, endTime) {
  const idx = arr.findIndex((el) => el.id === id)

  if (idx === -1) {
    return [...arr, { id, time }]
  }

  const oldItem = arr[idx]
  const newItem = { ...oldItem, time: time, endTime: endTime }
  return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
}

Timer.defaultProps = {
  initialTimer: [],
  minutes: 0,
  seconds: 0,
}

Timer.propTypes = {
  initialTimer: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  timerProps: PropTypes.bool,
  onToggleTimer: PropTypes.func,
  setInitialTimer: PropTypes.func,
}
