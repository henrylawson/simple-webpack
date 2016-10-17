import 'stylesheets/base'
import 'babel-polyfill'
import 'babel-core/register'
import 'isomorphic-fetch'
import React from 'react'
import AppContainer from './components/AppContainer'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form';
import projects from './reducers/projects'
import { Router, Route, browserHistory } from 'react-router'
import { push, routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import createLogger from 'redux-logger'
import * as routeActions from './actions/route'

const reducers = combineReducers({
  projects,
  routing: routerReducer
})

const router = routerMiddleware(browserHistory)
const logger = createLogger({collapsed: true})

const middleware = [thunk, router]

if (process.env.NODE_ENV != 'production') {
  middleware.push(logger)
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
