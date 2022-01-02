type sites = {
  site_key: string
  site_nice: string
  last_update: number
  odds: {
    h2h: number[]
  }
}

export type betMatch = {
  commence_time: number
  home_team: string
  away_team: string
  id: string
  match_id: string
  sites: sites[]
  sites_count: number
  sport_key: string
  sport_nice: string
  teams: string[]
}

export type placedBet = {
  betId: string
  betAmount: number
  time: number
  win: number
  selectedMatches: betSlipMatch[]
}

export type league = {
  active: boolean
  details: string
  group: string
  has_outrights: boolean
  key: string
  title: string
}

export type betSlipMatch = {
  away_team: string
  checked: boolean
  home_team: string
  last_update: number
  market: string
  marketOdd: string
  match_id: string
}

export type betSlip = {
  betId?: string
  betAmount: string
  time: number
  win: number
  selectedMatches: betSlipMatch[]
}

export type authUser = {
  idToken?: string
  refreshToken?: string
  email?: string
  localId?: string
  expiresIn?: string
}

export type User = {
  email: string
  password: string
}

export type RemoveMatch = {
  match_id: string
}

export type CheckMatch = {
  match_id: string
  checked: boolean
}
