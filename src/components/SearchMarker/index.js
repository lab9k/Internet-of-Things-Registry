import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { getMarker } from '../../services/api/marker';


const createIcon = () => {
  const marker = getMarker('marker');
  marker.iconSize = [50, 50];
  return new L.Icon({
    ...(marker)
  });
};


const SMarker = (props) => {
  console.log('placing marker');
  const deviceIcon = createIcon();
  const location = {
    lat: props.location[0],
    lng: props.location[1]
  };
  return (
    <Marker position={location} icon={deviceIcon}>
      <Popup>
        <p>search result</p>
      </Popup>
    </Marker>
  );
};

SMarker.propTypes = {
  location: PropTypes.array
};

export default SMarker;
