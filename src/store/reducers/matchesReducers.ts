import {AppActions} from '../../types/actions'
import {CHECK_MATCH, MatchesActionTypes, REMOVE_MATCH, REMOVE_MATCHES, SELECT_MATCH} from '../../types/matchActions'
import {betMatch, betSlipMatch} from '../../types/types'

const matches: betMatch[] = []
export const fetchMatches = (state = matches, action: MatchesActionTypes): betMatch[] => {
  if (action.type === 'FETCH_MATCHES') {
    return action.payload
  }
  return state
}

const selectedMatches: betSlipMatch[] = []
export const selectMatch = (state = selectedMatches, action: MatchesActionTypes): betSlipMatch[] => {
  if (action.type === SELECT_MATCH) {
    const matchIncluded = state.find(match => match.match_id === action.payload.match_id)
    if (!matchIncluded) {
      //this means the match is not there at all and you anna add it
      localStorage.setItem('state', JSON.stringify([...state, action.payload]))
      return [...state, action.payload]
    } else if (matchIncluded && matchIncluded.market === action.payload.market) {
      return state.filter(match => match.match_id !== action.payload.match_id)
      // console.log(matchIncluded , action)
    }
  }
  // else if (action.type === 'ADD_LOCALSTORAGE') {
  //   return action.payload
  // }
  else if (action.type === CHECK_MATCH) {
    const match = state.find(match => match.match_id === action.payload.match_id)
    if (match) {
      match.checked = action.payload.checked
    }
    return [...state]
  } else if (action.type === REMOVE_MATCH) {
    return state.filter(match => match.match_id !== action.payload.match_id)
  } else if (action.type === REMOVE_MATCHES) {
    localStorage.setItem('selectedMatches', JSON.stringify([]))
    return []
  }
  return state
}

export const clearMatches = () => {}
