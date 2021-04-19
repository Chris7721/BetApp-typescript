import {betMatch, betSlip, league, betSlipMatch, CheckMatch} from './types'

export const FETCH_MATCHES = 'FETCH_MATCHES'
export const FETCH_LEAGUES = 'FETCH_LEAGUES'
export const FETCH_BETS = 'FETCH_BETS'
export const LEAGUES_MATCHES_FETCHED = 'LEAGUES_MATCHES_FETCHED'
export const FETCH_LEAGUE_MATCHES = 'FETCH_LEAGUE_MATCHES'
export const SELECT_MATCH = 'SELECT_MATCH'
export const REMOVE_MATCH = 'REMOVE_MATCH'
export const ADD_LOCALSTORAGE = 'ADD_LOCALSTORAGE'
export const CHECK_MATCH = 'CHECK_MATCH'
export const REMOVE_MATCHES = 'REMOVE_MATCHES'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const APP_LOAD = 'APP_LOAD'
export const BET_AMOUNT = 'BET_AMOUNT'

export interface FetchMatches {
  type: typeof FETCH_MATCHES
  payload: betMatch[]
}

export interface FetchLeagues {
  type: typeof FETCH_LEAGUES
  payload: league[]
}

export interface FetchBets {
  type: typeof FETCH_BETS
  payload: betSlip[]
}

export interface FetchLeagueMatches {
  type: typeof FETCH_LEAGUE_MATCHES
  payload: betMatch[]
}

export interface LeagueMatchesFetched {
  type: typeof LEAGUES_MATCHES_FETCHED
  payload: boolean
}

export interface SelectMatch {
  type: typeof SELECT_MATCH
  payload: betSlipMatch
}

export interface checkMatch {
  type: typeof CHECK_MATCH
  payload: CheckMatch
}

export interface RemoveMatch {
  type: typeof REMOVE_MATCH
  payload: {
    match_id: string
  }
}

export interface betAmount {
  type: typeof BET_AMOUNT
  payload: number
}

export interface appLoad {
  type: typeof APP_LOAD
  payload: boolean
}

export interface AddLocalStorage {
  type: typeof ADD_LOCALSTORAGE
  payload: betSlipMatch
}

export interface ClearSelectedMatches {
  type: typeof REMOVE_MATCHES
}

export type MatchesActionTypes =
  | FetchMatches
  | AddLocalStorage
  | FetchLeagues
  | FetchBets
  | FetchLeagueMatches
  | LeagueMatchesFetched
  | SelectMatch
  | RemoveMatch
  | ClearSelectedMatches
  | checkMatch
  | betAmount
  | appLoad
