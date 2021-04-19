import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import App from './Components/App'
import {AppState} from './store/configureStore'
// import {ReduxStore} from './store/configureStore'

import reducers from './store/reducers'
import {AppActions} from './types/actions'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
