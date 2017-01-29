import Console from './console';

const loggerMiddleware = store => next => action => {
    Console.log('Dispatching', action);
    const result = next(action);
    Console.log('Next state', store.getState());
    return result;
};

export default loggerMiddleware;
