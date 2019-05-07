import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Icon } from 'antd'
import { initializeGrid, setPlaying, restartGame, resetGame } from '../modules/game'
import { setStatistic } from '../modules/statistic'
import { setTimer } from '../modules/timer'
import { LEVELS } from '../constants'
import {
    setStatisticsToLocalStorage,
    initializeGrid as initGrid,
    checkGameCompleted,
    convertMintuesStringToSecondsNumber,
    seccondsToTimeString
} from '../utils'

class IsCompleted extends PureComponent {
  componentDidUpdate(prevProps) {
    const { grid, visibledCards, eliminatedCards } = this.props

    if (checkGameCompleted(grid, visibledCards, eliminatedCards) === true) {
      this.stopGame()
      this.setStatistics()
      this.showCompleteModal()
    }
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

    dispatch(restartGame())
  }

  newGame = () => {
    const { dispatch } = this.props

    dispatch(setTimer(''))
    dispatch(resetGame())
  }

  setStatistics = () => {
    const { level, timer, won, dispatch } = this.props
    const initialTimerInSeconds = LEVELS[level].time * 60
    const timerInSeconds = convertMintuesStringToSecondsNumber(timer)
    const bestTime = initialTimerInSeconds - timerInSeconds

    const statistics = setStatisticsToLocalStorage([{
      path: 'won',
      value: won + 1
    }, {
      path: `bestTime.${level}`,
      value: seccondsToTimeString(bestTime)
    }])

    dispatch(setStatistic(statistics))
  }

  showCompleteModal = () => {
    Modal.confirm({
      title: 'Congratulations!!!',
      content: 'Your memory is still useful.',
      okText: 'Try again',
      cancelText: 'Too easy? Try different level',
      icon: <Icon type="check-circle" style={{ color: 'green' }} />,
      onOk: () => this.restartGame(),
      onCancel: () => this.newGame(),
    });
  }

  render() {
    return null
  }
}

export default connect(state => ({ ...state.game, ...state.timer, ...state.statistic }))(IsCompleted)
