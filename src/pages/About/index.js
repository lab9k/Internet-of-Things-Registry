import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import messages from './messages';
import './style.scss';

const About = () => (
  <Fragment>
    <h2><FormattedMessage {...messages.title} /></h2>

    <NavLink to="/about/faq" className="link-faq">
      <FormattedMessage {...messages.faq} />
    </NavLink>

    <FormattedHTMLMessage tagName="div" {...messages.contents} />
  </Fragment>
);

export default About;
