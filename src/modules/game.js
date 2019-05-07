import delay from 'lodash/delay'
import { checkMatchingCards } from '../utils'

export const SET_LEVEL = 'game/SET_LEVEL'
export const INITIALIZE_GRID = 'game/INITIALIZE_GRID'
export const SET_PLAYING = 'game/SET_PLAYING'
export const SET_VISIBLE_CARD = 'game/SET_VISIBLE_CARD'
export const MATCHING_SUCCESS = 'game/MATCHING_SUCCESS'
export const MATCHING_FAILURE = 'game/MATCHING_FAILURE'
export const RESTART_GAME = 'game/RESTART_GAME'
export const RESET_GAME = 'game/RESET_GAME'

const initialState = {
  level: '',
  grid: [],
  isPlaying: false,
  visibledCards: [],
  eliminatedCards: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        level: action.level
      }

    case INITIALIZE_GRID:
      return {
        ...state,
        grid: action.grid
      }

    case SET_PLAYING:
      return {
        ...state,
        isPlaying: action.value
      }

    case SET_VISIBLE_CARD:
      return {
        ...state,
        ...action.nextState
      }

    case MATCHING_SUCCESS:
      return {
        ...state,
        visibledCards: [],
        eliminatedCards: action.eliminatedCards
      }

    case MATCHING_FAILURE:
      return {
        ...state,
        visibledCards: []
      }

    case RESTART_GAME:
      return {
        ...state,
        grid: [],
        isPlaying: false,
        visibledCards: [],
        eliminatedCards: []
      }

    case RESET_GAME:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export const setLevel = (level = '') => {
  return dispatch => {
    dispatch({
      type: SET_LEVEL,
      level
    })
  }
}

export const initializeGrid = (grid = []) => {
  return dispatch => {
    dispatch({
      type: INITIALIZE_GRID,
      grid
    })
  }
}

export const setPlaying = (value = true) => {
  return dispatch => {
    dispatch({
      type: SET_PLAYING,
      value
    })
  }
}


export const setVisibleCard = (index) => {
  return (dispatch, getState) => {
    const { game } = getState()
    const { isMatch, visibledCards, eliminatedCards } = checkMatchingCards(game, index)

    dispatch({
      type: SET_VISIBLE_CARD,
      nextState: {
        visibledCards
      }
    })

    if (isMatch !== undefined) {
      delay(() => {
        const type = isMatch ? MATCHING_SUCCESS : MATCHING_FAILURE
        const nextState = isMatch ? { eliminatedCards } : {}

        dispatch({
          type,
          ...nextState
        })
      }, 800);
    }
  }
}

export const restartGame = () => {
  return dispatch => {
    dispatch({
      type: RESTART_GAME
    })
  }
}

export const resetGame = () => {
  return dispatch => {
    dispatch({
      type: RESET_GAME
    })
  }
}