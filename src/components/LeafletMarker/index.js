import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import categories from '../../static/categories';
import './style.scss';
import messages from './messages';


const createIcon = (device) => new L.Icon({
  ...(categories[device.application] || categories.Sensor)
});

const LMarker = (props) => {
  const device = props.device;
  const deviceIcon = createIcon(device);
  const devicePosition = [device.latitude, device.longitude];
  const {
    intl: { formatMessage }
  } = props;
  const deviceLabel = formatMessage(messages.device);
  const categoryLabel = formatMessage(messages.category);
  const typesLabel = formatMessage(messages.types);
  return (
    <Marker position={devicePosition} icon={deviceIcon} key={device.id}>
      <Popup>
        <div className="device-popup">
          <h3>{deviceLabel}</h3>
          <div className="device-popup-information">
            <p className="device-popup-information-label">{categoryLabel}</p>
            <p className="device-popup-information-text">{device.categories.join(', ')}</p>
          </div>
          <div className="device-popup-information">
            <p className="device-popup-information-label">{typesLabel}</p>
            <p className="device-popup-information-text">{device.types.map((el) => el.name).join(', ') || 'Unknown'}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

LMarker.propTypes = {
  device: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    categories: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LMarker);
