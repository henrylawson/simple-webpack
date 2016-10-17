const LOGGED_IN_HOME = '/books'

export const requireNoAuth = (nextState, replace) => {
  return (dispatch, getState) => {
    const state = getState()
    replace(LOGGED_IN_HOME)
  }
}
