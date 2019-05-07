export const SET_TIMER = 'timer/SET_TIMER'

const initialState = {
  timer: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        timer: action.timer
      }

    default:
      return state
  }
}

export const setTimer = (timer = '') => {
  return dispatch => {
    dispatch({
      type: SET_TIMER,
      timer
    })
  }
}
