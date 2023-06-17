import { userService } from '../../services/user.service'

export function spendBalance(amount) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SPEND_BALANCE', amount })
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function setUser() {
  return async (dispatch, getState) => {
    try {
      const user = await userService.getLoggedinUser()

      return dispatch({ type: 'SET_USER', user })
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function signup(name, email) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.signup(name, email)

      return dispatch({ type: 'SET_USER', user })
    } catch (error) {
      console.log('error:', error)
    }
  }
}
