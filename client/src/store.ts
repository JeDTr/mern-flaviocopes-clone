import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk';
import rootReducer from './reducers'
import rootSaga from './sagas'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
  }
}

const initialState = {}

const sagaMiddleware = createSagaMiddleware()
// const middleware = [sagaMiddleware]

const identity: (x: any) => void = x => x

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity,
  ),
)

sagaMiddleware.run(rootSaga)

export type AppState = ReturnType<typeof rootReducer>

export default store
