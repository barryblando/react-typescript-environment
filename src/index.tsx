import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import * as serviceWorker from './serviceWorker';
import store from './controller/store';
import history from './controller/history';
import AppContainer from './containers/AppContainer';

const ENTRY_POINT = document.querySelector('#react-app-root');

// creating starting endpoint for app.
const render = () => {
  ReactDOM.render(<AppContainer store={store} history={history} />, ENTRY_POINT);
};

// this will help us understand where the problem is located once app will fall.
const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

// register serviceWorkers if available
serviceWorker.unregister();

// This code is excluded from production bundle
if (__DEV__) {
  // ========================================================
  // DEVELOPMENT STAGE! HOT MODULE REPLACE ACTIVATION!
  // ========================================================
  const devRender = () => {
    if (module.hot) {
      module.hot.accept('./containers/AppContainer', () => render());
    }

    render();
  };

  // Wrap render in try/catch
  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  // ========================================================
  // PRODUCTION GO!
  // ========================================================
  render();
}
