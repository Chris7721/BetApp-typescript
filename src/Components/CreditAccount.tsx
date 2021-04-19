import React, {FC, useState} from 'react'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {useFormik} from 'formik'
import {updateBetAmount} from '../store/actions/auth'
import {authUser} from '../types/types'
import {bindActionCreators} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'
import {AppState} from '../store/configureStore'
import {ReactComponent as Spinner} from '../assets/icons/spinner.svg'

type ownProp = {
  close: Function
}
type Props = LinkDispatchProps & LinkStateProps & ownProp
const CreditAccount: FC<Props> = props => {
  const [crediting, setCrediting] = useState<boolean>(false)
  const {values, handleSubmit, getFieldProps, touched, errors} = useFormik({
    initialValues: {
      credit: 0
    },
    validationSchema: Yup.object().shape({
      credit: Yup.number().min(100).required('Required')
    }),
    async onSubmit(values) {
      try {
        setCrediting(true)
        await new Promise(resolve => setTimeout(resolve, 5000))
        setCrediting(false)
        props.updateBetAmount(props.betAmount + values.credit)
        props.close()
      } catch (err) {}
    }
  })

  return (
    <div className="creditAccount">
      <form onSubmit={handleSubmit}>
        <div className="creditAccount__input">
          <label className="">Amount</label>
          <input className="uk-input uk-form-width-medium" type="number" placeholder="min. NGN100" {...getFieldProps('credit')} />
          <span className="error">{touched['credit'] && errors['credit']}</span>
        </div>
        <div className="uk-margin">
          <button className={`uk-button uk-button-default pay ${!errors.credit && touched['credit'] ? 'active' : ''}`} type="submit">
            <span>Credit Account</span>
            {crediting ? <Spinner /> : null}
          </button>
        </div>
      </form>
    </div>
  )
}

interface LinkStateProps {
  authUser: authUser
  betAmount: number
}
interface LinkDispatchProps {
  updateBetAmount: (newBetAmount: number) => void
}
const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    authUser: state.authUser,
    betAmount: state.betAmount
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    updateBetAmount: bindActionCreators(updateBetAmount, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditAccount)
