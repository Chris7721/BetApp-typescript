import {MatchesActionTypes} from '../../types/matchActions'
import {betMatch, league} from '../../types/types'

const leaguesState: league[] = []
export const fetchLeagues = (leagues = leaguesState, action: MatchesActionTypes): league[] => {
  if (action.type === 'FETCH_LEAGUES') {
    return action.payload
  }
  return leagues
}

const leagueMatches: betMatch[] = []
export const fetchLeagueMatches = (state = leagueMatches, action: MatchesActionTypes): betMatch[] => {
  if (action.type === 'FETCH_LEAGUE_MATCHES') {
    return action.payload
  }
  return state
}

export const leagueMatchesFetched = (leagueMatches = false, action: MatchesActionTypes) => {
  if (action.type === 'LEAGUES_MATCHES_FETCHED') {
    // console.log("yepa" +action.payload)
    return action.payload
  }
  return leagueMatches
}
