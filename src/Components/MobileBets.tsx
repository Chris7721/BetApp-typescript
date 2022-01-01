import React, {FC, useState} from 'react'
import Transition from 'react-transition-group/Transition'
import {ReactComponent as Arrow} from '../assets/icons/arrow.svg'
import SelectedMatches from './SelectedMatchesList'
import BookBet from './BookBet'
import Cashout from './PlacedBetList'
import {authUser, betSlipMatch, placedBet} from '../types/types'
type ownProps = {
  authUser: authUser
  placedBets: placedBet[]
  selectedMatches: betSlipMatch[]
}
const MobileBets: FC<ownProps> = props => {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [currentComp, setCurrentComp] = useState<string>('bets')
  const openModal = (comp: string, modalShow: boolean) => {
    setCurrentComp(comp)
    setIsModalShowing(modalShow)
  }
  const showBets = () => {
    if (currentComp === 'selectedMatches') {
      if (props.selectedMatches.length > 0) {
        return <SelectedMatches />
      } else {
        return <BookBet />
      }
    }
    return <Cashout authUser={props.authUser} placedBets={props.placedBets} />
  }

  const addAnimation = (state: string) => {
    if (state === 'entering') {
      return 'slide-up-enter'
    } else if (state === 'entered') {
      return 'slide-up-enter-active'
    } else if (state === 'exiting') {
      return 'slide-up-exit-active'
    }
  }
  return (
    <div className="mobilebets">
      <Transition in={isModalShowing} timeout={200} mountOnEnter unmountOnExit>
        {state => (
          <div className="mobilebets__content">
            <div className={`mobilebets__top ${addAnimation(state)}`}>
              <Arrow onClick={() => setIsModalShowing(false)} />
              <div className="betinfo bets">{showBets()}</div>
            </div>
          </div>
        )}
      </Transition>

      {/* You were trying to figure out why the odds were not updating in mobile and also
            trying to update the markup of yhis component, since the buttons would always be on the screen
             */}
      <div className="mobilebets__bottom">
        <button className="uk-button uk-button-primary betlist" onClick={() => openModal('selectedMatches', true)}>
          <span>Betlist</span>
          <span className="circle">{props.selectedMatches.length}</span>
        </button>
        <button className="uk-button uk-button-primary bet-cashout" onClick={() => openModal('placedBets', true)}>
          <span>Cashout</span>
          <span className="circle">{props.placedBets.length}</span>
        </button>
      </div>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     selectedMatches: state.selectedMatches,
//     placedBets: state.placedBets
//   }
// }
export default MobileBets
