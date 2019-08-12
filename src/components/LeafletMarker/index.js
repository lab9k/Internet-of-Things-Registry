import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import categories from '../../static/categories';
import './style.scss';

const createIcon = (device) => new L.Icon({
  ...(categories[device.application] || categories.Sensor)
});

// const createMetaInfoFields = (device) => {
//   if (!device.meta) return [];

//   return Object.entries(device.meta).map(([metaFieldKey, metaFieldValue]) => (
//     <LPopupMetaInfo
//       key={metaFieldKey}
//       field={{
//         title: metaFieldKey,
//         value: metaFieldValue
//       }}
//     ></LPopupMetaInfo>
//   ));
// };

class LMarker extends React.Component {

  constructor(props) {
    super(props);
    this.device = props.device;
    this.deviceIcon = createIcon(this.device);
    this.devicePosition = [this.device.latitude, this.device.longitude];
  }

  render() {
    return (
      <Marker
        position={this.devicePosition}
        icon={this.deviceIcon}
        key={this.device.id}
      >
        <Popup
          className="invisible"
          onOpen={() => this.props.onOpen(this.device)}
          onClose={() => this.props.onClose(this.device)}
        >
        </Popup>
      </Marker >
    );
  }
}

LMarker.propTypes = {
  device: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    meta: PropTypes.object
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LMarker;
