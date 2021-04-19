import React, {FC} from 'react'
import {ReactComponent as Star} from '../assets/icons/star.svg'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ListLoader from './Loaders/ListLoader'
import {league} from '../types/types'
import {AppState} from '../store/configureStore'

type ownProp = {
  leagueClicked?: () => any
}
type Props = LinkStateProps & ownProp
const Leagues: FC<Props> = props => {
  const appendClass = (id: string) => {
    document.querySelector(`#${id}`)!.classList.add('selected')
  }
  const renderLeagues = () => {
    return props.leagues!.map(league => (
      <li className="list-group-item" key={league.key}>
        <NavLink
          className="league-link"
          onClick={() => props.leagueClicked!()}
          activeStyle={{
            fontWeight: 700
          }}
          to={`/league/${league.key}`}
        >
          {league.title}
        </NavLink>
        <div onClick={() => appendClass(league.key)} id={league.key} className="league-star ">
          <Star />
        </div>
      </li>
    ))
  }
  return (
    <div className="leagues">
      <ul className="uk-list uk-list-divider list-group">
        {props.leagues!.length > 0 ? (
          renderLeagues()
        ) : (
          <div className="loaders">
            {new Array(27).fill(null).map((e, index) => (
              <ListLoader key={index} />
            ))}
          </div>
        )}
      </ul>
    </div>
  )
}
interface LinkStateProps {
  leagues?: league[]
}
const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    leagues: state.leagues
  }
}

export default connect(mapStateToProps, null)(Leagues)
