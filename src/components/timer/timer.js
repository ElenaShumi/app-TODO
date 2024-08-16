import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
// import PropTypes from 'prop-types'

import './timer.css'

function Timer({ id, minutesProps, secondsProps, timerProps, onToggleTimer }) {
  const [startAt, setStartAt] = useState()
  const [initialTimer, setInitialTimer] = useState(0)

  const timeSeconds = minutesProps * 1000 * 60 + secondsProps * 1000
  // console.log(minutesProps * 60 + secondsProps)
  // console.log(timeSeconds)
  // console.log(timerProps)

  const now = useNow(100, startAt)

  const timeFromStart = now - (startAt ?? now)

  const timer = timeFromStart + initialTimer
  const countDown = Math.max(0, timeSeconds - timer)

  const minutesString = String(Math.floor(countDown / 1000 / 60)).padStart(2, '0')
  const secondsString = String(Math.floor((countDown % 60000) / 1000)).padStart(2, '0')

  const toggleTimer = (value) => {
    if (value === 'pause') {
      setInitialTimer(timer)
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
      toggleTimer('play')
    }

    // return () => saveTime(minutesString, secondsString)
  }, [])

  // const saveTime = (min, sec) => {
  //   toggleTime(id, 'minutes', min)
  //   toggleTime(id, 'seconds', sec)
  // }

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
  return now
}
