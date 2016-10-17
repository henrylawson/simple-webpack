const projects = (state = {}, action) => {
  switch (action.type) {
    case 'SAY_HI':
      return { ...state, hi: 'yes' }
    default:
      return state
  }
}

export default projects
