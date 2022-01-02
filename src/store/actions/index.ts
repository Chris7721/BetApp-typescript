// import oddsApi from '../apis/the-odds-api'
import axios from 'axios'
import {betMatch, betSlipMatch, CheckMatch, RemoveMatch} from '../../types/types'
import {AppActions} from '../../types/actions'
import {convertObjectToArray} from '../../utils/utils'
import {Dispatch} from 'redux'
import {AppState} from '../configureStore'
import {
  AddLocalStorage,
  ADD_LOCALSTORAGE,
  CHECK_MATCH,
  FETCH_BETS,
  FETCH_LEAGUES,
  FETCH_LEAGUE_MATCHES,
  FETCH_MATCHES,
  LEAGUES_MATCHES_FETCHED,
  REMOVE_MATCH,
  REMOVE_MATCHES,
  SELECT_MATCH
} from '../../types/matchActions'
// const process.env.REACT_APP_ODDS_API_KEY = '2c61ef4e8abf276a676863b868ccc621'
const resolveAwayTeam = (match: betMatch) => {
  return match.teams.filter(team => team !== match.home_team)[0]
}
export const fetchMatches = (league: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  const response = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&region=uk&mkt=h2h&sport=${league}`)
  let matches = response.data.data
  for (let i = 0; i < matches.length; i++) {
    matches[i].match_id = `${matches[i].teams.join('').replace(/\s/g, '')}${matches[i].commence_time}`
    matches[i].away_team = resolveAwayTeam(matches[i])
  }
  dispatch({
    type: FETCH_MATCHES,
    payload: response.data.data
  })
}

export const fetchLeagues = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  const response = await axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}`)
  let leagues = response.data.data.filter((league: any) => league.group.includes('Soccer'))
  dispatch({
    type: FETCH_LEAGUES,
    payload: leagues
  })
}

export const fetchBets = (userId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  const {data} = await axios.get(`${process.env.REACT_APP_FIREBASE_STORE_URL}/betlist/${userId}.json`)
  dispatch({
    type: FETCH_BETS,
    payload: convertObjectToArray(data)
  })
}

export const fetchLeagueMatches = (league: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  dispatch({
    type: LEAGUES_MATCHES_FETCHED,
    payload: false
  })
  const response = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&region=uk&mkt=h2h&sport=${league}`)
  let matches = response.data.data
  for (let i = 0; i < matches.length; i++) {
    matches[i].match_id = `${matches[i].teams.join('').replace(/\s/g, '')}${matches[i].commence_time}`
    matches[i].away_team = resolveAwayTeam(matches[i])
  }
  dispatch({
    type: FETCH_LEAGUE_MATCHES,
    payload: response.data.data
  })
  dispatch({
    type: LEAGUES_MATCHES_FETCHED,
    payload: true
  })
}

export const selectMatch = (betDetails: betSlipMatch) => async (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: SELECT_MATCH,
    payload: betDetails
  })
}

export const removeMatch = (betDetails: RemoveMatch) => async (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: REMOVE_MATCH,
    payload: betDetails
  })
}

export const addLocalStorage = (betDetails: betSlipMatch): AddLocalStorage => {
  return {
    type: ADD_LOCALSTORAGE,
    payload: betDetails
  }
}

export const checkMatch = (betDetails: CheckMatch) => async (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: CHECK_MATCH,
    payload: betDetails
  })
}
export const leagueMatchesFetch = (isFetched: boolean): AppActions => {
  return {
    type: LEAGUES_MATCHES_FETCHED,
    payload: isFetched
  }
}

export const clearSelectedMatches = () => {
  return {
    type: REMOVE_MATCHES
  }
}
