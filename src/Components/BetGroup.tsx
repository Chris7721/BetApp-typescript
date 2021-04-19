import React, {ReactNode} from 'react'
import {betMatch} from '../types/types'
import BetMatch from './BetMatch'
type Props = {
  matches: betMatch[]
}
const BetInfo = ({matches}: Props) => {
  const renderMatches = () => {
    let theDates: number[] = []
    matches.forEach((val: betMatch) => theDates.push(val.commence_time))
    let theUniques: number[] = []
    theUniques = [...Array.from(new Set(theDates))]
    const els: ReactNode[] = []
    let previous: string = ''
    theUniques.forEach((el, index, arr) => {
      let formatedUnix: string = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
      let date = new Date(el * 1000)
      if (previous !== formatedUnix) {
        els.push(
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
          els.push(<BetMatch key={match.id} match={match} />)
        })
      previous = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
    })
    return els
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
