import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import LocaleToggle from '../LocaleToggle';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import LeafletMap from '../../components/LeafletMap';
import reducer from './reducer';
import saga from './saga';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <LocaleToggle />
        {/* <div className="col-12 col-sm-10 offset-sm-1 col-md-8">*/}
        <Switch>
          <Route exact path="/" component={LeafletMap} />
          {/* <Route path="/about" component={About} />*/}
        </Switch>
        {/* </div>*/}
      </div>
    );
  }
}

// changed key to global
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
