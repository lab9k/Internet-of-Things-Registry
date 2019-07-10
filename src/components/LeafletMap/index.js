import React from 'react';
// TODO: import PropTypes from 'prop-types'; unused
import { Route } from 'react-router-dom';
// TODO: import { isEqual } from 'lodash'; is unused atm
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import { getDevices, getDevice, getCameraAreas } from '../../services/api/iot';
import { showAreas, showMarkers, toggleElement } from '../../services/iotmap';
import categories from '../../static/categories';
import '../../services/map'; // loads L.Proj (Proj binding leaflet)

import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';

const visibleCategories = { ...categories };

const mapCenter = [52.378851, 4.8979017];

Object.keys(visibleCategories)
  .filter((cat) => !(visibleCategories[cat].visible && visibleCategories[cat].enabled))
  .forEach((cat) => {
    delete visibleCategories[cat];
  });

// TODO: const DEFAULT_ZOOM_LEVEL = 14; unused atm

const SELECTION_STATE = {
  NOTHING: 0,
  DEVICE: 1,
  AREA: 2
};

class LMap extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.state = {
      selection: {
        type: SELECTION_STATE.NOTHING,
        element: undefined
      },
      devices: []
    };
    this.clearSelection = this.clearSelection.bind(this);
  }

  componentDidMount() {
    // if (!this.map) {
    //   const options = {
    //     layer: 'standaard',
    //     target: 'mapdiv',
    //     marker: false,
    //     search: true,
    //     zoom: DEFAULT_ZOOM_LEVEL,
    //     onQueryResult: this.props.onQueryResult
    //   };
    //
    //   if (this.props.location.geometrie) {
    //     options.marker = true;
    //     options.center = {
    //       longitude: this.props.location.geometrie.coordinates[1],
    //       latitude: this.props.location.geometrie.coordinates[0]
    //     };
    //   }
    //
    //   this.map = amaps.createMap(options);
    // }
    // if (!isEqual(this.props.location, this.props.location)) {
    //   const input = document.querySelector('#nlmaps-geocoder-control-input');
    //   if (input && this.props.location.address) {
    //     const address = this.props.location.address;
    //     const toevoeging = address.huisnummer_toevoeging ? `-${address.huisnummer_toevoeging}` : '';
    //     const display = `${address.openbare_ruimte} ${address.huisnummer}${address.huisletter}${toevoeging}, ${address.postcode} ${address.woonplaats}`;
    //     input.setAttribute('value', display);
    //   }
    // }
    //
    // this.addMarkers();
    // this.addCameraAreas();
    this.fetchDevices();
  }

  async fetchDevices() {
    this.setState({ devices: [...await getDevices()] });
  }

  async addCameraAreas() {
    const geojson = await getCameraAreas();
    showAreas(this.map, geojson, this.showCameraArea.bind(this));
  }

  async addMarkers() {
    this.devices = await getDevices();
    showMarkers(this.map, this.devices, this.showDevice.bind(this));
  }

  showCameraArea(areaDetails) { // eslint-disable-line no-unused-vars
    const area = {};
    this.setState({ selection: { type: SELECTION_STATE.AREA, element: area } });
  }

  async showDevice(d) {
    if (d) {
      const device = await getDevice(d.id);
      this.setState({ selection: { type: SELECTION_STATE.DEVICE, element: device } });
    } else {
      this.setState({ selection: { type: SELECTION_STATE.NOTHING } });
    }
  }

  clearSelection() {
    this.setState({ selection: { type: SELECTION_STATE.NOTHING } });
  }

  render() {
    const AboutButton = (<Route
      render={({ history }) => (
        <button className="about-button" onClick={() => { history.push('/about'); }}>Over dit register</button>
      )}
    />);

    return (
      <div className="map-component">
        <div className="map">
          <div id="mapdiv">
            <div id="about-iot">
              {AboutButton}
            </div>

            <Map center={mapCenter} zoom={14}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.state.devices.map((device) => {
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
              })}

            </Map>

            <MapLegend categories={visibleCategories} onCategorieToggle={(key) => toggleElement(this.map, key)} />

            {this.state.selection.type === SELECTION_STATE.DEVICE && (
              <DeviceDetails device={this.state.selection.element} location={this.state.location} onDeviceDetailsClose={this.clearSelection} />
            )}

            {this.state.selection.type === SELECTION_STATE.AREA && (
              <CameraAreaDetails onDeviceDetailsClose={this.clearSelection} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

LMap.defaultProps = {
  location: {},
  onQueryResult: () => { }
};

LMap.propTypes = {
  // TODO: location: PropTypes.object,
  // TODO: onQueryResult: PropTypes.func
};

export default LMap;
