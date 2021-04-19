import {authUser} from './types'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export interface Signup {
  type: typeof SIGN_UP
  payload: authUser
}

export interface Signin {
  type: typeof SIGN_IN
  payload: authUser
}

export interface Signout {
  type: typeof SIGN_OUT
}

export type AuthActionTypes = Signin | Signout | Signup
