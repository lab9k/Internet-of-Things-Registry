import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';

import messages from './messages';
import './style.scss';

const CameraAreaDetails = (props) => {
  const TypesButton = (
    <Route
      render={({ history }) => (
        <button
          className="device-details__question-mark-button"
          onClick={() => {
            history.push('/categories');
          }}
        >
          <QuestionMarkIcon />
        </button>
      )}
    />
  );

  const {
    intl: { formatMessage }
  } = props;

  return (
    <section id="device-details" className="device-details">
      <div className="device-details__heading">
        <button
          className="device-details__button"
          onClick={props.onDeviceDetailsClose}
          title="Sluiten"
        >
          <CloseIcon className="device-details__button-icon" />
        </button>
      </div>
      <div className="device-details__body">
        <div className="device-details__table">
          <div className="device-details__header-row device-details__row">
            <div className="device-details__row-label">
              {formatMessage(messages.device)}
            </div>
          </div>
          <div className="device-details__row">
            <div className="device-details__row-label">
              {formatMessage(messages.category)}
            </div>
            <div className="device-details__row-element">
              {formatMessage(messages.area)}
            </div>
            {TypesButton}
          </div>

          <div className="device-details__row">
            <div className="device-details__row-label">{formatMessage(messages.type)}</div>
            <div className="device-details__row-element">{formatMessage(messages.unknown)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

CameraAreaDetails.propTypes = {
  intl: intlShape.isRequired,
  onDeviceDetailsClose: PropTypes.func
};

export default injectIntl(CameraAreaDetails);
