import { combineReducers } from 'redux'
import statistic from './statistic'
import timer from './timer'
import game from './game'

export default combineReducers({
  statistic,
  timer,
  game
})
