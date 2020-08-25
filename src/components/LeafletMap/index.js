import React from 'react';
import { Route } from 'react-router-dom';
import { Map } from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';

import { getDevices } from '../../services/api/iot';

import MapLegend from '../MapLegend';
import LMarker from '../LeafletMarker';

import './style.scss';
import Geocoder from '../Geocoder';
import SMarker from '../SearchMarker';
import { Category, Type } from './Category';


const mapCenter = [
  parseFloat(process.env.MAP_CENTER_LATITUDE),
  parseFloat(process.env.MAP_CENTER_LONGITUDE)
];

class LMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      categories: [],
      center: mapCenter,
      zoom: 14,
      searchMarker: undefined
    };
    this.setViewPort = this.setViewPort.bind(this);
  }

  componentDidMount() {
    getDevices()
      .then((dev) => this.setState({ devices: [...dev] }))
      .then(() => this.loadCategories());
  }

  get enabledCategories() {
    return Object.entries(this.state.categories)
      .filter(([, value]) => value.enabled)
      .map(([, value]) => value);
  }

  get enabledTypes() {
    return this.enabledCategories.flatMap((t) => t.types).filter((t) => t.enabled);
  }

  get visibleDevices() {
    const enabledTypes = this.enabledTypes.map((t) => t.name);
    return this.state.devices.filter(
          (device) => this.enabledCategories
              .map((cat) => cat.name)
              .includes(device.category) && enabledTypes.includes(device.type));
  }

  setViewPort(center) {
    this.setState({
      center,
      zoom: 19,
      searchMarker: center
    });
  }

  loadCategories() {
    const tax = [];
    this.state.devices
      .forEach((d) => {
        if (!tax[d.category]) {
          tax[d.category] = new Category(d.category);
        } if (!tax[d.category].types.map((t) => t.name).includes(d.type)) {
          tax[d.category].types.push(new Type(d.type));
        }
      }
      );
    this.setState({ categories: tax });
  }

  makeCategory(t) {
    return {
      category: t,
      enabled: true,
      visible: true,
    };
  }

  toggleCategory(key) {
    const currentCategories = this.state.categories;
    currentCategories[key].enabled = !currentCategories[key].enabled;
    // eslint-disable-next-line no-param-reassign
    currentCategories[key].types.forEach((t) => { t.enabled = currentCategories[key].enabled; });
    this.setState({ categories: currentCategories });
  }

  toggleType(category, type) {
    const currentType = category.types.find((t) => t.name === type.name);
    currentType.enabled = !currentType.enabled;
    this.setState({ categories: this.state.categories });
  }

  render() {
    let SearchMarker;
    if (this.state.searchMarker) {
      SearchMarker = <SMarker location={this.state.searchMarker} />;
    } else {
      SearchMarker = null;
    }
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
            <Geocoder viewportCallback={this.setViewPort} />
            <Map
              center={this.state.center}
              zoom={this.state.zoom}
              onViewportChanged={this.onViewportChanged}
              maxZoom={parseInt(process.env.MAP_MAX_ZOOM, 10)}
            >
              <WMTSTileLayer
                url={process.env.MAP_ROOT}
                layer="SG-E-Stadsplan:Stadsplan"
                tilematrixSet="SG-WEB MERCATOR"
                format="image/png"
              />
              {SearchMarker}
              {this.visibleDevices.map((device) => (
                <LMarker device={device} key={device.id} />
                ))}
            </Map>
            <MapLegend
              categories={this.state.categories}
              onCategoryToggle={(key) => this.toggleCategory(key)}
              onTypeToggle={(category, type) => this.toggleType(category, type)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LMap;
