import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl/* , intlShape*/ } from 'react-intl';

import './style.scss';

const DeviceInfo = (props) => {
  const { device } = props;
  if (device) {
    return <div className="device-info-popup">{device.latitude}</div>;
  }
  return <div></div>;
};

DeviceInfo.propTypes = {
  device: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    meta: PropTypes.object
  }),
  // intl: intlShape.isRequired,
};

export default injectIntl(DeviceInfo);
