import React, {FC} from 'react'
import {connect} from 'react-redux'
import {fetchMatches} from '../store/actions'
import BetGroup from '../Components/BetGroup'
import {ReactComponent as Refresh} from '../assets/icons/refresh.svg'
import {betMatch} from '../types/types'
import {AppState} from '../store/configureStore'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'
import {bindActionCreators} from 'redux'

type AppProps = LinkDispatchProps & LinkStateProps
const MainView: FC<AppProps> = ({matches}) => {
  return (
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
      <div className="mainview__matches">
        <BetGroup matches={matches} />
      </div>
    </div>
  )
}

interface LinkStateProps {
  matches: betMatch[]
}
interface LinkDispatchProps {
  fetchMatches: (league: string) => void
}
const mapStateToProps = (state: AppState): LinkStateProps => {
  return {matches: state.matches}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    fetchMatches: bindActionCreators(fetchMatches, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
