import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import categories from '../../static/categories';
import './style.scss';
import messages from './messages';
import LPopupMetaInfo from '../LeafletPopupMetaInfo';

const createIcon = (device) =>
  new L.Icon({
    ...(categories[device.application] || categories.Sensor)
  });

const createMetaInfoFields = (device) => {
  if (!device.meta) return [];

  return Object.entries(device.meta).map(([metaFieldKey, metaFieldValue]) => (
    <LPopupMetaInfo
      key={metaFieldKey}
      field={{
        title: metaFieldKey,
        value: metaFieldValue
      }}
    />
  ));
};

const LMarker = (props) => {
  const device = props.device;
  const deviceIcon = createIcon(device);
  const devicePosition = [device.latitude, device.longitude];
  const {
    intl: { formatMessage }
  } = props;
  const deviceLabel = formatMessage(messages.device);
  const deviceCategory = formatMessage(messages.category);
  return (
    <Marker position={devicePosition} icon={deviceIcon} key={device.id}>
      <Popup>
        <div className="device-popup">
          <h3>{deviceLabel}</h3>
          <div className="device-popup-information">
            <p className="device-popup-information-label">{deviceLabel}</p>
            <p className="device-popup-information-text">
              {device.title}
            </p>
          </div>
          <div className="device-popup-information">
            <p className="device-popup-information-label">{deviceCategory}</p>
            <p className="device-popup-information-text">
              {device.category}
            </p>
          </div>
          {createMetaInfoFields(device)}
        </div>
      </Popup>
    </Marker>
  );
};

LMarker.propTypes = {
  device: PropTypes.shape({
    title: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string.isRequired,
    dataowner: PropTypes.string,
    dataprocessing: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.string,
    retention: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(LMarker);
