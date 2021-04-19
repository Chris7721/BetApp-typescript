import {AppActions} from '../../types/actions'
import {AuthActionTypes} from '../../types/authActions'
import {authUser} from '../../types/types'

const signedinUser: any = null
export const signinUser = (state = signedinUser, action: AuthActionTypes): authUser => {
  if (action.type === 'SIGN_UP') {
    return action.payload
  } else if (action.type === 'SIGN_IN') {
    return action.payload
  } else if (action.type === 'SIGN_OUT') {
    return null!
  }
  return state
}

export const betAmount = (betAmount = null, action: AppActions) => {
  if (action.type === 'BET_AMOUNT') {
    return action.payload
  }
  return betAmount
}

export const placedBets = (placedBets = [], action: AppActions) => {
  if (action.type === 'FETCH_BETS') {
    return [...action.payload]
  }
  return placedBets
}

export const appLoaded = (appLoaded = false, action: AppActions) => {
  if (action.type === 'APP_LOAD') {
    return action.payload
  }
  return appLoaded
}
