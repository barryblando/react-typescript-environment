// saga entry point - probably you don't need this
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

// Additional saga third-party library redux-saga-watch-actions here for correct Saga work during Code-Splitting mode.
// It helps us both to create and delete Sagas on the go, if we need.
import createSagaMiddlewareHelpers from 'redux-saga-watch-actions/lib/middleware';
import watchSagas from '../../modules/saga';

const sagaMiddleware = createSagaMiddleware();
const runSaga = saga => sagaMiddleware.run(saga);

const { injectSaga, cancelTask } = createSagaMiddlewareHelpers(sagaMiddleware); // <-- bind to sagaMiddleware.run

// RootSaga.js contains the main Saga logic for watching any async action added inside the core function rootSaga()
export function* rootSaga() {
  yield all([watchSagas()]);
}

export { cancelTask, injectSaga, runSaga };
export default sagaMiddleware;
