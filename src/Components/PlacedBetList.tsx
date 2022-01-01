import React from 'react'
import {ReactComponent as Arrow} from '../assets/icons/arrow.svg'
import {authUser, placedBet} from '../types/types'
import SingleBetMatch from './SingleBetMatch'
type ownProp = {
  placedBets: placedBet[]
  authUser: authUser
}

const Cashout = ({placedBets, authUser}: ownProp) => {
  const renderBets = () => {
    if (placedBets.length > 0) {
      return placedBets.map(bet => (
        <div key={bet.betId} className="cashout__matches">
          <div className="cashout__state">
            <span>Multiple</span>{' '}
            <div className="status">
              <span>PENDING</span>
              <Arrow />
            </div>
          </div>
          <SingleBetMatch bet={bet} />
        </div>
      ))
    }
    return (
      <div className="no-bets">
        <span role="img" aria-label="no-bet">
          You havent placed any bet🤔
        </span>
      </div>
    )
  }
  return (
    <div className="cashout">
      {!authUser ? (
        <div className="no-bets">
          <span role="img" aria-label="zero-bet">
            No bets at the moment👌
          </span>
        </div>
      ) : (
        renderBets()
      )}
    </div>
  )
}

export default Cashout
