import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Icon } from 'antd'
import { setStatistic } from '../modules/statistic'
import { setTimer } from '../modules/timer'
import { initializeGrid, setPlaying, restartGame, resetGame } from '../modules/game'
import TimerDumb from '../components/Timer'
import { LEVELS } from '../constants'
import { setStatisticsToLocalStorage, initializeGrid as initGrid, checkGameCompleted } from '../utils'

class Timer extends PureComponent {
  getStartValue = () => {
    const { level } = this.props

    return LEVELS[level].time * 60 // seconds
  }

  startGame = () => {
    const { dispatch } = this.props

    dispatch(setPlaying())
  }

  restartGame = () => {
    const { level, dispatch } = this.props

    this.startGame()
    initGrid(level, grid => dispatch(initializeGrid(grid)))
  }

  stopGame = () => {
    const { dispatch } = this.props

    dispatch(setTimer(''))
    dispatch(restartGame())
  }

  resetGame = () => {
    const { dispatch } = this.props

    dispatch(resetGame())
  }

  setStatistics = () => {
    const { lost, dispatch } = this.props
    const statistics = setStatisticsToLocalStorage([{
      path: 'lost',
      value: lost + 1
    }])

    dispatch(setStatistic(statistics))
  }

  showFailureModal = () => {
    Modal.confirm({
      title: 'Oops!!!',
      content: 'You just ran out of time. Better luck next time.',
      okText: 'Try again',
      cancelText: 'Too hard? Try different level',
      icon: <Icon type="close-circle" style={{ color: 'red' }} />,
      onOk: () => {
        this.restartGame()
      },
      onCancel: () => {
        this.resetGame()
      },
    });
  }

  checkTimerExpired = (timer) => {
    const { isPlaying } = this.props

    if (isPlaying && timer === '00:00') {
      this.stopGame()
      this.setStatistics()
      this.showFailureModal()
    }
  }

  checkGameCompleted = () => {
    const { grid, visibledCards, eliminatedCards } = this.props

    return checkGameCompleted(grid, visibledCards, eliminatedCards)
  }

  handleChange = (value) => {
    const { dispatch } = this.props

    dispatch(setTimer(value))
  }

  render() {
    const { grid, timer } = this.props

    if (grid.length > 0) {
      return (
        <TimerDumb
          value={timer}
          startValue={this.getStartValue()}
          startGame={this.startGame}
          onChange={this.handleChange}
          checkTimerExpired={this.checkTimerExpired}
          checkGameCompleted={this.checkGameCompleted}
        />
      )
    }

    return null
  }
}

export default connect(state => ({ ...state.game, ...state.timer, ...state.statistic }))(Timer)
