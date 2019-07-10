import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import SvgIcon from 'components/SvgIcon';
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
        <SvgIcon size={20}>
          <path
            id="a"
            d="M21.188 5.32H2.813v13.36h18.375V5.32zM8.325 12.26l-3.803 3.835V8.552l3.803 3.707zm.897.905L12 15.879l2.735-2.715 3.76 3.792H5.505l3.717-3.792zm2.778.948L4.82 7.044h14.36L12 14.112zm7.478 1.982l-3.76-3.792 3.76-3.706v7.498z"
          />
        </SvgIcon>
        {label}
      </button>
    )}
  />
);

ContactButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const TypesButton = ({ label }) => (
  <Route
    render={({ history }) => (
      <button
        className="device-details__question-mark-button"
        onClick={() => {
          history.push('/categories');
        }}
      >
        <SvgIcon title={label} size={26}>
          <path d="M12.5332155,16.4800562 C13.5080536,16.4800562 14.2927327,17.2636016 14.2927327,18.2394817 C14.2927327,19.214269 13.5080536,20 12.5332155,20 C11.5572846,20 10.7736984,19.214269 10.7736984,18.2394817 C10.7736984,17.2636016 11.5572846,16.4800562 12.5332155,16.4800562 L12.5332155,16.4800562 Z M11.099373,14.5676372 C11.099373,13.8026696 11.2906249,13.3043478 11.7682081,12.8475529 C13.182379,11.489189 14.2162319,10.8564515 14.2162319,9.97673874 C14.2162319,9.13636718 13.6228047,8.63913824 12.8381256,8.63913824 C11.653457,8.63913824 11.0228723,9.40410585 10.9463715,10.3417376 L8,10.1494029 C8.26775261,7.45234564 10.1223492,6 12.7812965,6 C15.1156621,6 17.0850098,7.30044493 17.0850098,9.76691905 C17.0850098,11.2214503 16.5309259,12.1011631 14.7134867,13.5349309 C14.1200595,13.9928187 13.9670581,14.4343143 13.9670581,14.8539536 L13.9670581,15.4091016 L11.099373,15.4091016 L11.099373,14.5676372 L11.099373,14.5676372 Z" id="Fill-2" fill="#666666"></path>
        </SvgIcon>
      </button>
    )}
  />
);

TypesButton.propTypes = {
  label: PropTypes.string.isRequired
};


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
