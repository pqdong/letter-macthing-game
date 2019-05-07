import React, { PureComponent, Fragment } from 'react'
import { Icon } from 'antd'
import Timer from 'easytimer.js';

export default class TimerDumb extends PureComponent {
  componentDidMount() {
    this.timer = new Timer();

    this.startTimer()
    this.props.startGame()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    if (this.timer) {
      const { startValue } = this.props

      this.timer
        .start({
          countdown: true,
          startValues: { seconds: startValue }
        })
      this.timer.addEventListener('secondsUpdated', () => {
        const { onChange, checkTimerExpired, checkGameCompleted } = this.props
        const timerString = this.timer.getTimeValues().toString(['minutes', 'seconds'])

        if (onChange) {
          onChange(timerString)
        }

        if (checkGameCompleted() === true) {
          this.stopTimer()
        } else {
          checkTimerExpired(timerString)
        }
      });
    }
  }

  stopTimer = () => {
    if (this.timer) {
      this.timer.stop()
      this.timer.removeEventListener('secondsUpdated')
    }
  }

  render() {
    const { value } = this.props

    return (
      <Fragment><Icon type="clock-circle" /> Time remaining: {value || 'Loading...'}</Fragment>
    )
  }
}
