/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import { getDevices, getDevice, getCameraAreas } from '../../services/api/iot';
import { showAreas, showMarkers } from '../../services/iotmap';
import categories from '../../static/categories';
import '../../services/map'; // loads L.Proj (Proj binding leaflet)

import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';
import LMarker from '../LeafletMarker';

import './style.scss';

const visibleCategories = { ...categories };

const mapCenter = [parseFloat(process.env.MAP_CENTER_LATITUDE), parseFloat(process.env.MAP_CENTER_LONGITUDE)];

Object.keys(visibleCategories)
  .filter((cat) => !(visibleCategories[cat].visible && visibleCategories[cat].enabled))
  .forEach((cat) => {
    delete visibleCategories[cat];
  });

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
      devices: [],
      categories: Object.keys(categories).reduce((prev, curr) => {
        // eslint-disable-next-line no-param-reassign
        prev[curr] = true;
        return prev;
      }, {})
    };
    this._isMounted = false;
    this.clearSelection = this.clearSelection.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchDevices();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  get visibleCategories() {
    return Object.entries(this.state.categories).reduce((prev, [categoryKey, enabled]) => {
      // eslint-disable-next-line no-param-reassign
      prev[categoryKey] = { ...categories[categoryKey], enabled };
      return prev;
    }, {});
  }

  getVisibleDevices() {
    return this.state.devices.filter((device) => this.state.categories[device.application]);
  }

  toggleCategory(key) {
    const currentCategories = this.state.categories;
    currentCategories[key] = !currentCategories[key];
    this.setState({ categories: { ...currentCategories } });
  }

  showCameraArea(areaDetails) { // eslint-disable-line no-unused-vars
    const area = {};
    this.setState({ selection: { type: SELECTION_STATE.AREA, element: area } });
  }

  async addMarkers() {
    this.devices = await getDevices();
    showMarkers(this.map, this.devices, this.showDevice.bind(this));
  }

  async addCameraAreas() {
    const geojson = await getCameraAreas();
    showAreas(this.map, geojson, this.showCameraArea.bind(this));
  }

  async fetchDevices() {
    const devices = await getDevices();
    if (this._isMounted) {
      this.setState({ devices: [...devices] });
    }
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

            <Map center={mapCenter} zoom={parseInt(process.env.MAP_DEFAULT_ZOOM, 10)} maxZoom={parseInt(process.env.MAP_MAX_ZOOM, 10)}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
              />
              {this.getVisibleDevices().map((device) => (
                <LMarker device={device} key={device.id} />
              ))}
            </Map>

            <MapLegend categories={this.visibleCategories} onCategorieToggle={(key) => this.toggleCategory(key)} />

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

export default LMap;
