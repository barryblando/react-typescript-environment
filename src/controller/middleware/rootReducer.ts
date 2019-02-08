import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from '../../modules/reducers';
import history from '../history';

// root Redux reducer
const makeRootReducer = asyncReducers => {
  return combineReducers({
    ...asyncReducers,
    app,
    router: connectRouter(history)
  });
};

// Split-Chunks environment, probably you would always need this.
// injectReducer is a regular JS function expression that respond for reducers checking each time when App store is updated.
// Let’s imagine we have an already prepared multi-page App where user clicks on the next page.
// Then the reducer of the new page will be attached to the root Redux store without any side effects while its chunk loads.
// Nice, isn’t it?
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;

  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
