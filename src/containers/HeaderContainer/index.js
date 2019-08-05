/**
 *
 * HeaderContainer
 *
 */

import React from 'react';
import Header from '../../components/Header';


import './style.scss';

export class HeaderContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Header />
    );
  }
}

export default HeaderContainer;
