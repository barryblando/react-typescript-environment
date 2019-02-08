import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

// We use here the connected-react-router library to deal with navigation in React-Redux pattern developing
import { ConnectedRouter } from 'connected-react-router';

import CoreLayout from '../layout';

const AppContainer = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CoreLayout />
      </ConnectedRouter>
    </Provider>
  );
};

AppContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default AppContainer;
