import reducer from './reducer';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from './loggerMiddlewear';
import firebaseMiddleware from './firebaseMiddlewear';
import wallMiddleware from './middleware/wallMiddleware';
import authMiddleware from './middleware/authMiddleware';

const enhancer = firebase => compose(
  applyMiddleware(
    thunk,
    loggerMiddleware,
    firebaseMiddleware(firebase),
    wallMiddleware(firebase),
    authMiddleware(firebase)
  )
);

export function create(firebase) {
  return createStore(
    reducer,
    enhancer(firebase)
  );
}
