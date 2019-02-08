import { put } from 'redux-saga/effects';
import { someAsyncAction } from '../actions';

export function* someSaga() {
  try {
    const payload = yield fetch('https://www.github.com');

    // throw an error if no payload received
    if (!payload) {
      throw new Error('Error in payload!');
    }

    // some payload from the response received
    yield put(someAsyncAction(payload));
  } catch (error) {
    throw new Error('Some error in sagas occurred!');
  }
}

export default someSaga;
