import React, {ReactNode} from 'react'
import {betMatch} from '../types/types'
import BetMatch from './BetListItem'
type Props = {
  matches: betMatch[]
}
const BetInfo = ({matches}: Props) => {
  const renderMatches = () => {
    let theUniques: number[] = []
    const matchDomElements: ReactNode[] = []
    let previousId: string = ''

    theUniques = [...Array.from(new Set(matches.map((val: betMatch) => val.commence_time)))]

    theUniques.forEach((el, index, arr) => {
      let formatedUnix: string = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
      let date = new Date(el * 1000)
      if (previousId !== formatedUnix) {
        matchDomElements.push(
          <tr key={el}>
            <td colSpan={2} className="match_date">{`${date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()}/${
              date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth()
            }
            ${date.toLocaleString('default', {weekday: 'long'})}`}</td>
          </tr>
        )
      }
      matches
        .filter(match => match.commence_time === el)
        .forEach((match, index, arr) => {
          matchDomElements.push(<BetMatch key={match.id} match={match} />)
        })
      previousId = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
    })
    return matchDomElements
  }
  return (
    <div className="betGroup">
      <table className="">
        <thead>
          <tr>
            <th className=""></th>
            <th className="teams"></th>
            <th className="">Home</th>
            <th className="">Draw</th>
            <th className="">Away</th>
          </tr>
        </thead>
        <tbody>{renderMatches()}</tbody>
      </table>
    </div>
  )
}

export default BetInfo
