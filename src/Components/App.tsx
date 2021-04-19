import React, {useEffect, FC} from 'react'
import {connect} from 'react-redux'
import {Router, Route, Switch} from 'react-router-dom'
import {addLocalStorage, fetchBets, fetchMatches, fetchLeagues} from '../store/actions'
import '../assets/css/app.scss'
import Header from './Header'
import Leagues from './Leagues'
import BetInfo from './BetInfo'
import MainView from '../pages/index'
import League from '../pages/League'
import Footer from './Footer'
import MobileBets from './MobileBets'
import history from '../history'
import {ReactComponent as LoadIcon} from '../assets/icons/money-bag.svg'
import {authUser, betSlipMatch, league, placedBet} from '../types/types'
import {AppState} from '../store/configureStore'
import {AddLocalStorage} from '../types/matchActions'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'
import {bindActionCreators} from 'redux'
import {refreshToken} from '../store/actions/auth'

type Props = LinkDispatchProps & LinkStateProps

const App: FC<Props> = props => {
  useEffect(() => {
    initApp()
  }, [])
  async function initApp() {
    const selectedMatches = localStorage.getItem('selectedMatches')
    if (selectedMatches) {
      props.addLocalStorage(JSON.parse(selectedMatches))
    }
    await props.fetchMatches('soccer_france_ligue_one')
    await props.refreshToken()
    if (props.authUser) {
      await props.fetchBets(props.authUser.localId || '')
    }
    await props.fetchLeagues()
  }
  const leg = [
    {
      active: true,
      details: 'string',
      group: 'string',
      has_outrights: true,
      key: 'string',
      title: 'string'
    }
  ]
  return (
    <div className="app">
      <Router history={history}>
        {props.appLoaded ? (
          <>
            <Header />
            <main className="main-content">
              <div className="main-content__left">
                <Leagues leagueClicked={() => {}} leagues={props.leagues} />
              </div>
              <div className="main-content__center">
                <Switch>
                  <Route path="/" exact component={MainView} />
                  <Route path="/league/:league" exact component={League} />
                </Switch>
              </div>
              <div className="main-content__right">
                <BetInfo selectedMatches={props.selectedMatches} authUser={props.authUser} placedBets={props.placedBets} />
              </div>
            </main>
            <Footer />
          </>
        ) : (
          <div className="loadScreen">
            <LoadIcon />
            {props.appLoaded}
          </div>
        )}
      </Router>
      <MobileBets authUser={props.authUser} placedBets={props.placedBets} selectedMatches={props.selectedMatches} />
    </div>
  )
}

interface LinkStateProps {
  authUser: authUser
  appLoaded: boolean
  leagues: league[]
  placedBets: placedBet[]
  selectedMatches: betSlipMatch[]
}
interface LinkDispatchProps {
  fetchBets: (userId: string) => void
  addLocalStorage: (betDetails: betSlipMatch) => AddLocalStorage
  fetchMatches: (league: string) => void
  fetchLeagues: () => void
  refreshToken: () => void
}

//this guy would merge the redux state to the component's prop
const mapStateToProps = (state: AppState): LinkStateProps => {
  // console.log("moprps", state.posts)
  return {
    appLoaded: state.appLoaded,
    authUser: state.authUser,
    leagues: state.leagues,
    placedBets: state.placedBets,
    selectedMatches: state.selectedMatches
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  // console.log("moprps", state.posts)
  return {
    fetchBets: bindActionCreators(fetchBets, dispatch),
    refreshToken: bindActionCreators(refreshToken, dispatch),
    addLocalStorage: bindActionCreators(addLocalStorage, dispatch),
    fetchMatches: bindActionCreators(fetchMatches, dispatch),
    fetchLeagues: bindActionCreators(fetchLeagues, dispatch)
  }
}

// const mapStateToProps = state => {
//   return {authUser: state.authUser, appLoaded: state.appLoaded, leagues: state.leagues}
// }
export default connect(mapStateToProps, mapDispatchToProps)(App)
