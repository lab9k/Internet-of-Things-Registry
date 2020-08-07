/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route } from 'react-router-dom';
import { Map } from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { getDevices } from '../../services/api/iot';

import MapLegend from '../MapLegend';
import LMarker from '../LeafletMarker';

import './style.scss';


const mapCenter = [
  parseFloat(process.env.MAP_CENTER_LATITUDE),
  parseFloat(process.env.MAP_CENTER_LONGITUDE)
];


const SELECTION_STATE = {
  NOTHING: 0,
  DEVICE: 1,
  AREA: 2
};

class LMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        type: SELECTION_STATE.NOTHING,
        element: undefined
      },
      devices: [],
      categories: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchDevices();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  get visibleCategories() {
    if (!Object.keys(this.state.categories).length) {
      this.loadCategories();
    }
    return this.state.categories;
  }

  getVisibleDevices() {
    try {
      return this.state.devices.filter(
          (device) => this.visibleCategories
            .filter((cat) => cat.enabled)
              .map((cat) => cat.name)
              .includes(device.category));
    } catch (e) {
      return [];
    }
  }

  loadCategories() {
    this.state.categories = [...new Set(this.state.devices.map((x) => x.category))]
      .map(this.makeCategory);
  }

  makeCategory(name) {
    return {
      isClustered: true,
      name,
      enabled: true,
      visible: true,
      iconSize: [25, 25],
      popupAnchor: [0, -10],
    };
  }

  toggleCategory(key) {
    const currentCategories = this.state.categories;
    currentCategories[key].enabled = !currentCategories[key].enabled;
    this.setState({ categories: currentCategories });
  }

  async fetchDevices() {
    const devices = await getDevices();
    if (this._isMounted) {
      this.setState({ devices: [...devices] });
    }
  }

  render() {
    const AboutButton = (
      <Route
        render={({ history }) => (
          <button
            className="about-button"
            onClick={() => {
              history.push('/about');
            }}
          >
            Over dit register
          </button>
        )}
      />
    );
    return (
      <div className="map-component">
        <div className="map">
          <div id="mapdiv">
            <div id="about-iot">{AboutButton}</div>

            <Map
              center={mapCenter}
              zoom={parseInt(process.env.MAP_DEFAULT_ZOOM, 10)}
              maxZoom={parseInt(process.env.MAP_MAX_ZOOM, 10)}
            >
              {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
              /> */}

              <WMTSTileLayer
                url={process.env.MAP_ROOT}
                layer="SG-E-Stadsplan:Stadsplan"
                tilematrixSet="SG-WEB MERCATOR"
                format="image/png"
              />
              <MarkerClusterGroup>
                {this.getVisibleDevices().map((device) => (
                  <LMarker device={device} key={device.id} />
                ))}
              </MarkerClusterGroup>
            </Map>

            <MapLegend
              categories={this.visibleCategories}
              onCategoryToggle={(key) => this.toggleCategory(key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LMap;
