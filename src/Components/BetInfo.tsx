import React, {FC, useState} from 'react'
import SelectedMatches from './SelectedMatchesList'
import Cashout from './PlacedBetList'
import BookBet from './BookBet'
import {authUser, betSlipMatch, placedBet} from '../types/types'

type CompProps = {
  selectedMatches: betSlipMatch[]
  authUser: authUser
  placedBets: placedBet[]
}
const BetInfo: FC<CompProps> = props => {
  const [currentComp, setCurrentComp] = useState<string>('betslip')

  const checkCurrenturrentComp = (comp: string) => {
    return currentComp === comp ? 'active' : ''
  }
  const renderBody = () => {
    if (currentComp === 'betslip') {
      if (props.selectedMatches.length > 0) {
        return <SelectedMatches />
      }
      return <BookBet />
    }
    return <Cashout authUser={props.authUser} placedBets={props.placedBets} />
  }

  return (
    <div className="betinfo">
      <div className="betinfo__option">
        <div onClick={() => setCurrentComp('betslip')} className={`betinfo__option-betslip ${checkCurrenturrentComp('betslip')}`}>
          <div>BetSlip</div> <span className="circle">{props.selectedMatches.length}</span>
        </div>
        <div onClick={() => setCurrentComp('cashout')} className={`betinfo__option-cashout ${checkCurrenturrentComp('cashout')}`}>
          <div>Cashout</div> <span className="circle">{props.placedBets.length}</span>
        </div>
      </div>
      {renderBody()}
    </div>
  )
}

export default BetInfo
