import React, {useState, FC} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {useFormik} from 'formik'
import BetPlaced from './BetSuccess'
import {ReactComponent as Cancel} from '../assets/icons/cancel.svg'
import Modal from './ModalPortal'
import {fetchBets} from '../store/actions'
import {updateBetAmount} from '../store/actions/auth'
import * as Yup from 'yup'
import {authUser, betSlipMatch} from '../types/types'
import {bindActionCreators} from 'redux'
import {AppState} from '../store/configureStore'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'

type Props = LinkDispatchProps & LinkStateProps
const BetAmount: FC<Props> = props => {
  const {values, handleSubmit, getFieldProps, touched, errors, setFieldValue} = useFormik({
    initialValues: {
      betAmount: 0
    },
    validationSchema: Yup.object().shape({
      betAmount: Yup.number().min(100, 'Cannot be less than 100').max(props.betAmount, 'Bet Amount cannot exceed balance').positive('Amount cannot be negative').required('Required')
    }),
    onSubmit() {
      try {
        placeBet('placed', true)
      } catch (err) {}
    }
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [betType, setBetType] = useState<string>('')
  const setAmount = (amount: number) => {
    setFieldValue('betAmount', amount)
  }
  const checkedMatches = props.selectedMatches.filter(match => match.checked === true)
  const combinedOdd = checkedMatches.reduce((acc, item) => acc * Number(parseFloat(item.marketOdd)), 1)

  const totalOdd = combinedOdd
  const potentialWin = totalOdd * values.betAmount
  const bonus = 0.4 * potentialWin

  const showBetInfo = (betType: string, modalState: boolean) => {
    setBetType(betType)
    setIsModalOpen(modalState)
  }
  const placeBet = async (betType: string, modalState: boolean) => {
    try {
      await axios.post(`https://betapp-54dbf.firebaseio.com/betlist/${props.authUser.localId}.json`, {
        selectedMatches: props.selectedMatches,
        betAmount: values.betAmount,
        win: potentialWin + bonus,
        time: Date.now()
      })
      props.updateBetAmount(props.betAmount - values.betAmount)
      props.fetchBets(props.authUser.localId || '')
      setBetType(betType)
      setIsModalOpen(modalState)
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }
  const betInfo = () => {
    // setBetType(betType)
    const modal =
      isModalOpen && betType ? (
        <Modal>
          <div className="modal__body" style={{maxWidth: '450px', padding: '10px'}}>
            <Cancel onClick={() => showBetInfo('', false)} />
            <BetPlaced betType={betType} />
          </div>
        </Modal>
      ) : (
        ''
      )
    return modal
  }

  return (
    <div className="betAmount">
      {betInfo()}
      <form onSubmit={handleSubmit} noValidate>
        <div className="betAmount__details">
          <div className="betAmount__details-money">
            <small className="info">Amount</small>
            <div className="input">
              <input
                className={`${errors['betAmount'] && props.authUser ? 'uk-form-danger' : ''} uk-input uk-form-width-xsmall`}
                {...getFieldProps('betAmount')}
                type="number"
                placeholder="Amount"
                style={{width: '70px', height: '26px', textAlign: 'right'}}
              />
              <span className="invalid-feedback">{props.authUser && touched['betAmount'] && errors['betAmount']}</span>
            </div>
          </div>
          {/* {this.state.betAmount} */}
          <div className="betAmount__details-winning">
            <small className="info">Bonus</small>
            <div className="money">
              <span>NGN</span>&nbsp;
              <h3 className="content">{bonus.toFixed(2)}</h3>
            </div>
          </div>
          <div className="betAmount__details-bonus">
            <small className="info">Odds</small>
            <h3 className="content">{totalOdd.toFixed(2)}</h3>
          </div>
          <div className="betAmount__details-winning">
            <small className="info">Potential Win</small>
            <div className="money">
              <span>NGN</span>&nbsp;
              <h3 className="content">
                {(potentialWin + bonus).toFixed(2)}
                {/* P.Win */}
              </h3>
            </div>
          </div>
        </div>
        <div className="betAmount__actions">
          <div className="betAmount__actions-suggest">
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(0)}>
              RESET
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(100)}>
              100
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(500)}>
              500
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(1000)}>
              1000
            </div>
          </div>
          <div className="betAmount__actions-buttons">
            <button className="uk-button uk-button-default uk-button-small cancel">Cancel</button>
            {props.authUser ? (
              <button className={`uk-button uk-button-default uk-button-small bet ${!errors.betAmount ? 'active' : ''}`} type="submit">
                Bet
              </button>
            ) : (
              <button className="uk-button uk-button-default uk-button-small bet active" onClick={() => showBetInfo('booked', true)}>
                Book Bet
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

interface LinkStateProps {
  authUser: authUser
  betAmount: number
  selectedMatches: betSlipMatch[]
}
interface LinkDispatchProps {
  fetchBets: (userId: string) => void
  updateBetAmount: (newBetAmount: number) => void
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    selectedMatches: state.selectedMatches,
    authUser: state.authUser,
    betAmount: state.betAmount
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    fetchBets: bindActionCreators(fetchBets, dispatch),
    updateBetAmount: bindActionCreators(updateBetAmount, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetAmount)
