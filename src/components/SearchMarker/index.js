import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import categories from '../../static/categories';


const createIcon = () =>
  new L.Icon({
    ...(categories.SearchMarker)
  });

const SMarker = (props) => {
  const deviceIcon = createIcon();
  console.log(deviceIcon);
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
