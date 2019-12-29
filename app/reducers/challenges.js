const defaultState = {
  available: [],
  past: [],
  pastChallenges: [],
  in_progress: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MAKE_CHALLENGE_REQUEST':
      return {
        ...state,
        in_progress: true,
      }
    case 'RESET_CHALLENGE_REQUEST':
      return {
        ...state,
        in_progress: false,
      }
    case 'GET_CHALLENGES':
      return {
        ...state,
        available: action.payload,
      }
    case 'GET_PAST_CHALLENGES':
      return {
        ...state,
        pastChallenges: action.payload.data,
      }
    default:
      return state
  }
}
