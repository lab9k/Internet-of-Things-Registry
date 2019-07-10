import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import { getMarkerCategory } from '../../services/iotmap';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import messages from './messages';
import './style.scss';

const ContactButton = ({ id, label }) => (
  <Route
    render={({ history }) => (
      <button
        className="device-details__contact-button action secundary-blue"
        onClick={() => {
          history.push(`/contact-owner/${id}`);
        }}
      >
        <MailIcon />
        {label}
      </button>
    )}
  />
);

ContactButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const TypesButton = () => (
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

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isMapPreviewPanelVisible: true };
  }

  render() {
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <section id="device-details" className="device-details">
        <div className="device-details__heading">
          <button
            className="device-details__button"
            onClick={this.props.onDeviceDetailsClose}
            title={formatMessage(messages.close)}
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
              <div className="device-details__row-element">
                {this.props.device.name}
              </div>
            </div>
            <div className="device-details__row">
              <div className="device-details__row-label">
                {formatMessage(messages.category)}
              </div>
              <div className="device-details__row-element">
                {getMarkerCategory(this.props.device).name}
              </div>
              <TypesButton label={formatMessage(messages.details)} />
            </div>
            {this.props.device.types && (
              <div className="device-details__row">
                <div className="device-details__row-label">
                  {formatMessage(messages.type)}
                </div>
                <div className="device-details__row-element">
                  {(this.props.device.types.length &&
                    this.props.device.types[0].name) ||
                    formatMessage(messages.unknown)}
                </div>
              </div>
            )}
          </div>
          <ContactButton
            id={this.props.device.id}
            label={formatMessage(messages.contact_owner)}
          />
        </div>
      </section>
    );
  }
}

DeviceDetails.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number,
    types: PropTypes.array.isRequired,
    name: PropTypes.string // Back-end does not provide value at this time
  }).isRequired,
  intl: intlShape.isRequired,
  onDeviceDetailsClose: PropTypes.func
};

export default injectIntl(DeviceDetails);
