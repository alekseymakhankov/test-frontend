import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import reducers from '~/reducers';

const createDevelopmentStore = () => {
  return createStore(
    reducers,
    applyMiddleware(reduxLogger),
  );
};

const createProductionStore = () => {
  return createStore(
    reducers,
    applyMiddleware(reduxLogger),
  );
};

export const getStore = () => {
  const store = process.env.NODE_ENV === 'production'
    ? createProductionStore()
    : createDevelopmentStore();
  return store;
};
