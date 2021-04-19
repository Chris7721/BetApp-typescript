import thunk, {ThunkMiddleware} from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import reducers from '../store/reducers'
import {AppActions} from '../types/actions'

// const composeEnhancers =  compose
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type AppState = ReturnType<typeof reducers>
export const ReduxStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))
