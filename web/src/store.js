import reducer from './reducer';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from './loggerMiddlewear';
import firebaseMiddleware from './firebaseMiddlewear';
import wallMiddleware from './middleware/wallMiddleware';
import authMiddleware from './middleware/authMiddleware';
import roomOptionsMiddleware from './middleware/roomOptionsMiddleware';

const enhancer = firebase => compose(
  applyMiddleware(
    thunk,
    loggerMiddleware,
    firebaseMiddleware(firebase),
    wallMiddleware(firebase),
    authMiddleware(firebase),
    roomOptionsMiddleware(firebase)
  )
);

export function create(firebase) {
  return createStore(
    reducer,
    enhancer(firebase)
  );
}
