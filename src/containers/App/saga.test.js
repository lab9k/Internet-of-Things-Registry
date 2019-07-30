import { all, put, takeLatest } from 'redux-saga/effects';

import { authCall } from 'shared/services/api/api';
import watchAppSaga, { callLogin, callLogout, callAuthorize } from './saga';
import { LOGIN, LOGOUT, AUTHENTICATE_USER } from './constants';
import { authorizeUser, showGlobalError } from './actions';

jest.mock('../../shared/services/auth/auth');
jest.mock('shared/services/api/api');

describe('App saga', () => {
  beforeEach(() => {
    global.window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should watchAppSaga', () => {
    const gen = watchAppSaga();
    expect(gen.next().value).toEqual(all([ // eslint-disable-line redux-saga/yield-effects
      takeLatest(LOGIN, callLogin), // eslint-disable-line redux-saga/yield-effects
      takeLatest(LOGOUT, callLogout), // eslint-disable-line redux-saga/yield-effects
      takeLatest(AUTHENTICATE_USER, callAuthorize), // eslint-disable-line redux-saga/yield-effects
    ])
    );
  });

  describe('login', () => {
    // @TODO fix this test
    // it.only('should error', () => {
    // const gen = callLogin({ payload });
    // gen.next();
    // expect(gen.throw().value).toEqual(put(showGlobalError('LOGIN_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    // expect(1).toBe(1);
    // });
  });

  describe('logout', () => {
    it('should error', () => {
      // const error = new Error();
      const gen = callLogout();
      gen.next();
      expect(gen.throw().value).toEqual(put(showGlobalError('LOGOUT_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    });
  });

  describe('callAuthorize', () => {
    const payload = {
      accessToken: 'akjgrff',
      userName: 'foo@bar.com',
      userScopes: [
        'SIG/ALL'
      ]
    };

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL']
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(gen.next({
        groups: ['SIG/ALL']
      }).value).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
    });

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL']
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(gen.next({
        groups: ['SIG/ALL']
      }).value).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
    });

    it('should fail without message when accessToken is not available', () => {
      const gen = callAuthorize({ payload: null });
      expect(gen.next().value).toBeUndefined();
    });

    it('should error', () => {
      const gen = callAuthorize({ payload });
      gen.next();
      expect(gen.throw().value).toEqual(put(showGlobalError('AUTHORIZE_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    });
  });
});
