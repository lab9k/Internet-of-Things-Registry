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

class LMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      categories: []
    };
  }

  componentDidMount() {
    getDevices()
      .then((dev) => this.setState({ devices: [...dev] }))
      .then(() => this.loadCategories());
  }

  get enabledCategories() {
    return this.state.categories.filter((cat) => cat.enabled);
  }

  get visibleDevices() {
    return this.state.devices.filter(
          (device) => this.enabledCategories
              .map((cat) => cat.name)
              .includes(device.category));
  }

  loadCategories() {
    const cats = [...new Set(this.state.devices.map((x) => x.category))]
      .map(this.makeCategory);
    this.setState({ categories: cats });
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
                {this.visibleDevices.map((device) => (
                  <LMarker device={device} key={device.id} />
                ))}
              </MarkerClusterGroup>
            </Map>

            <MapLegend
              categories={this.state.categories}
              onCategoryToggle={(key) => this.toggleCategory(key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LMap;
