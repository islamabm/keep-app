const INITIAL_STATE = {
  loggedInUser: {
    name: 'Jorji',
    email: '',
  },
}

export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SPEND_BALANCE':
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          balance: loggedInUser.balance - action.amount,
        },
      }
    case 'SET_USER':
      return {
        ...state,
        loggedInUser: { ...action.user },
      }

    default:
      return state
  }
}
