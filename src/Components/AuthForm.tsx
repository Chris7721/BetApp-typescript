import React, {FC, useState} from 'react'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {signUp, signIn} from '../store/actions/auth'
import {authUser, User} from '../types/types'
import {bindActionCreators} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppActions} from '../types/actions'
import {AppState} from '../store/configureStore'
type ownProp = {
  onRegistered: Function
  currentComp: string
}
type Props = LinkDispatchProps & LinkStateProps & ownProp
const UserForm: FC<Props> = ({signUp, onRegistered, currentComp, signIn}) => {
  const [error, setError] = useState<string>('')
  const {handleSubmit, getFieldProps, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    async onSubmit(values) {
      setError('')
      try {
        if (currentComp === 'Register') {
          await signUp({email: values.email, password: values.password})
        } else {
          await signIn({email: values.email, password: values.password})
        }
        onRegistered()
      } catch (err) {
        setError('Incorrect email/password')
        console.log(err)
      }
    }
  })
  const buttonText = currentComp === 'Register' ? 'Register' : 'Login'
  return (
    <form onSubmit={handleSubmit}>
      <div className="uk-width-1-1">
        <span className="error">
          {error ? <span className="error">{error}</span> : null}
          {touched['email'] && errors['email']}
        </span>
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input className="uk-input" type="text" {...getFieldProps('email')} placeholder="test@gmail.com" />
        </div>
      </div>

      <div className="uk-width-1-1">
        <span className="error">{touched['password'] && errors['password']}</span>
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
          <input className="uk-input first-input" type="password" {...getFieldProps('password')} placeholder="password" />
        </div>
      </div>
      <button
        className={`uk-button no-opaq uk-button-default uk-width-1-1 uk-margin-small-bottom action ${!errors.email && !errors.password && (touched['email'] || touched['password']) ? 'activee' : ''}`}
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  )
}

interface LinkStateProps {
  authUser: authUser
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    authUser: state.authUser
  }
}
interface LinkDispatchProps {
  signIn: (user: User) => void
  signUp: (user: User) => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
