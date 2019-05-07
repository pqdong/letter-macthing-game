export const SET_STATISTIC = 'statistic/SET_STATISTIC'
export const SET_STATISTIC_WON_LOST = 'statistic/SET_STATISTIC_WON_LOST'
export const SET_STATISTIC_BEST_TIME = 'statistic/SET_STATISTIC_BEST_TIME'

const initialState = {
  won: 0,
  lost: 0,
  bestTime: {
    easy: '--:--',
    normal: '--:--',
    hard: '--:--'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATISTIC:
      return {
        ...action.statistics
      }

    case SET_STATISTIC_WON_LOST:
      return {
        ...state,
        [action.field]: action.count
      }

    case SET_STATISTIC_BEST_TIME:
      return {
        ...state,
        bestTime: {
          ...state.bestTime,
          [action.level]: action.time
        }
      }

    default:
      return state
  }
}

export const setStatistic = (statistics) => {
  return dispatch => {
    dispatch({
      type: SET_STATISTIC,
      statistics
    })
  }
}

export const setStatisticWonLost = (field, count) => {
  return dispatch => {
    dispatch({
      type: SET_STATISTIC_WON_LOST,
      field,
      count
    })
  }
}

export const setStatisticBestTime = (level, time) => {
  return dispatch => {
    dispatch({
      type: SET_STATISTIC_WON_LOST,
      level,
      time
    })
  }
}

