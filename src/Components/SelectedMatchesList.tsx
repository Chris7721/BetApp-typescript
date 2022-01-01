import React, {FC} from 'react'
import {connect} from 'react-redux'
import {selectMatch, clearSelectedMatches, removeMatch, checkMatch} from '../store/actions'
import BetAmount from './BetAmount'
import {ReactComponent as Football} from '../assets/icons/footbal.svg'
import {ReactComponent as Cancel} from '../assets/icons/cancel.svg'
import {shortenText} from '../utils/utils'
import {AppState} from '../store/configureStore'
import {betSlipMatch, CheckMatch, RemoveMatch} from '../types/types'
import {bindActionCreators} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'
type Props = LinkDispatchProps & LinkStateProps
export const SelectedMatches: FC<Props> = props => {
  const renderBody = () => {
    return (
      <div className="betinfo__body">
        <div className="betinfo__remove">
          <span onClick={() => props.clearSelectedMatches()}>Remove All</span>
        </div>
        {renderselectedMatches()}
        {props.selectedMatches.length > 0 ? <BetAmount /> : null}
      </div>
    )
  }
  const renderselectedMatches = () => {
    return props.selectedMatches.map(match => {
      return (
        <div key={match.match_id} className="betInfo">
          <div className="betInfo__selected">
            <div className="betInfo__selected-box">
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label>
                  <input className="uk-checkbox" name={match.match_id} type="checkbox" id={match.match_id} onChange={() => unCheck(match.match_id, match.checked)} checked={match.checked} />
                </label>
              </div>
            </div>
          </div>
          <div className="betInfo__main">
            <div className="betInfo__main-top">
              <div className="betInfo__main-top-content">
                <Football />
                <p className="market">{match.market}</p>
              </div>
            </div>
            <div className="betInfo__main-middle" title={`${match.home_team} v ${match.away_team}`}>
              <span>{match.last_update.toString().slice(match.last_update.toString().length - 4, match.last_update.toString().length)}</span> |{' '}
              <span>{shortenText(`${match.home_team} v ${match.away_team}`, 0, 16)}</span>
            </div>
            <div className="betInfo__main-bottom">
              <span>1X2</span>
            </div>
          </div>
          <div className="betInfo__action">
            <div
              className="betInfo__action-cancel"
              onClick={() =>
                props.removeMatch({
                  match_id: match.match_id
                })
              }
            >
              <Cancel />
            </div>
            <div className="betInfo__action-odd">{match.marketOdd}</div>
          </div>
        </div>
      )
    })
  }
  const unCheck = (match_id: string, match_checked: boolean) => {
    props.checkMatch({
      match_id,
      checked: !match_checked
    })
  }
  return <div>{renderBody()}</div>
}

interface LinkStateProps {
  selectedMatches: betSlipMatch[]
}
interface LinkDispatchProps {
  selectMatch: (betDetails: betSlipMatch) => void
  clearSelectedMatches: () => void
  removeMatch: (match: RemoveMatch) => void
  checkMatch: (betDetails: CheckMatch) => void
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    selectedMatches: state.selectedMatches
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    selectMatch: bindActionCreators(selectMatch, dispatch),
    clearSelectedMatches: bindActionCreators(clearSelectedMatches, dispatch),
    removeMatch: bindActionCreators(removeMatch, dispatch),
    checkMatch: bindActionCreators(checkMatch, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMatches)
