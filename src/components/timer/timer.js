import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
// import PropTypes from 'prop-types'

import './timer.css'

function Timer({ id, minutesProps, secondsProps, timerProps, onToggleTimer, initialTimer, setInitialTimer }) {
  const [startAt, setStartAt] = useState()
  const [initialTimerM, setInitialTimerM] = useState(0)

  useEffect(() => {
    if (initialTimer.length !== 0) {
      console.log('ЕСТЬ')
      const time = timerSearch(initialTimer)
      setInitialTimerM(time)
      // console.log(now)
    } else {
      console.log('Ничего нет')
      setStartAt()
    }
  }, [])

  function timerSearch(arr) {
    const idx = arr.findIndex((el) => el.id === id)

    if (idx === -1) {
      // return setStartArr([...arr, { id, value }])
      // console.log('NOOOOOOO')
      return 0
    }

    const item = arr[idx]

    const newTime = now - item.endTime
    return newTime + item.time
  }

  const timeSeconds = minutesProps * 1000 * 60 + secondsProps * 1000

  const now = useNow(100, startAt)

  const timeFromStart = now - (startAt ?? now)

  const timer = timeFromStart + initialTimerM
  // console.log(timer)

  useEffect(() => {
    // console.log(timer)
    return () => {
      // console.log(timer)
      // console.log(newArr)
      const newArr = useNewArr(initialTimer, id, timer, now)
      setInitialTimer(newArr)
    }
  }, [timer])

  const countDown = Math.max(0, timeSeconds - timer)

  const minutesString = String(Math.floor(countDown / 1000 / 60)).padStart(2, '0')
  const secondsString = String(Math.floor((countDown % 60000) / 1000)).padStart(2, '0')

  const toggleTimerNoow = (value) => {
    if (value === 'pause') {
      // console.log(timer)
      setInitialTimerM(timer)
      onToggleTimer(id, false)
      setStartAt()
    } else if (value === 'play') {
      setStartAt(Date.now())
      onToggleTimer(id, true)
    }
  }

  useEffect(() => {
    // console.log(minutesProps + ':' + secondsProps)
    if (timerProps) {
      toggleTimerNoow('play')
    }

    // return () => saveTime(minutesString, secondsString)
  }, [])

  const isCountEnd = countDown === 0
  useEffect(() => {
    clearInterval()
  }, [isCountEnd])
  return (
    <span className="description">
      <button className="icon icon-play" onClick={() => toggleTimerNoow('play')}></button>
      <button className="icon icon-pause" onClick={() => toggleTimerNoow('pause')}></button>
      {` ${minutesString}:${secondsString} `}
    </span>
  )
}

export default Timer

function useNow(updateInterval, enabled, cb) {
  const cbRef = useRef(cb)
  cbRef.current = cb
  const [now, setNow] = useState(Date.now())

  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    setNow(Date.now())
    cbRef.current?.(Date.now())

    const interval = setInterval(() => {
      setNow(Date.now())
      cbRef.current?.(Date.now())
    }, updateInterval)

    return () => {
      clearInterval(interval)
    }
  }, [updateInterval, enabled])
  // console.log(now)
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
