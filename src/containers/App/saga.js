import { all } from 'redux-saga/effects';
import CONFIGURATION from 'shared/services/configuration/configuration';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;


export default function* watchAppSaga() {
  yield all([

  ]);
}
