import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import categories from '../../static/categories';
import './style.scss';

export const LMarker = (props) => {
  const device = props.device;
  const deviceIcon = new L.Icon({
    ...(categories[device.application] || categories.Sensor)
  });
  const devicePosition = [device.latitude, device.longitude];
  // TODO: requires translation
  return (
    <Marker position={devicePosition} icon={deviceIcon} key={device.id}>
      <Popup>
        <div className="device-popup">
          <h3>Apparaat</h3>
          <div className="device-popup-information">
            <p className="device-popup-information-label">Category</p>
            <p className="device-popup-information-text">{device.categories.join(', ')}</p>
          </div>
          <div className="device-popup-information">
            <p className="device-popup-information-label">Types</p>
            <p className="device-popup-information-text">{device.types.map((el) => el.name).join(', ') || 'Unknown'}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

LMarker.propTypes = {
  device: PropTypes.object
};
