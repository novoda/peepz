import reducer from './reducer';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from './logger';

const enhancer = compose(
  applyMiddleware(thunk, loggerMiddleware)
);

export function create() {
  return createStore(
    reducer,
    enhancer
  );
}
