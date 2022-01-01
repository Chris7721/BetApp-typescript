import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchLeagueMatches} from '../store/actions'
import BetGroup from '../Components/BetList'
import {ReactComponent as Refresh} from '../assets/icons/refresh.svg'
import {ReactComponent as LoadIcon} from '../assets/icons/money-bag.svg'
import {betMatch} from '../types/types'
import {AppState} from '../store/configureStore'
import {ThunkDispatch} from 'redux-thunk'
import {bindActionCreators} from 'redux'
import {AppActions} from '../types/actions'
import {RouteComponentProps} from 'react-router-dom'

interface leagueParams {
  league: string
}
type AppProps = LinkDispatchProps & LinkStateProps & RouteComponentProps<leagueParams>

const MainView = ({matches, matchesFetched, match, fetchLeagueMatches}: AppProps) => {
  useEffect(() => {
    fetchLeagueMatches(match?.params?.league)
  }, [match?.params?.league])
  return (
    <div className="league">
      {!matchesFetched ? (
        <div className="load-screen">
          <LoadIcon />
        </div>
      ) : (
        <div className="mainview">
          <div className="mainview__top">
            <div className="latest">
              <span className="circle"></span>
              <h2>Upcoming Matches</h2>
            </div>
            <div className="refresh">
              <span>Refresh</span>
              <Refresh />
            </div>
          </div>
          {matches.length > 0 ? (
            <div className="mainview__matches">
              <BetGroup matches={matches} />
            </div>
          ) : (
            <p style={{textAlign: 'center'}}>No matches</p>
          )}
        </div>
      )}
    </div>
  )
}

interface LinkStateProps {
  matches: betMatch[]
  matchesFetched: boolean
}
interface LinkDispatchProps {
  fetchLeagueMatches: (league: string) => void
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    matches: state.matches,
    matchesFetched: state.leagueMatchesFetched
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    fetchLeagueMatches: bindActionCreators(fetchLeagueMatches, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainView)
