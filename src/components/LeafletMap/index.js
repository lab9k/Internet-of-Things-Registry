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

import LocateControl from '../locationControl';


class LMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      categories: [],
      center: [parseFloat(process.env.MAP_CENTER_LATITUDE),
        parseFloat(process.env.MAP_CENTER_LONGITUDE)],
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

  get enabledDevices() {
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
  // reacts to the checkmark being toggled on and off
  toggleCategory(key) {
    const currentCategories = this.state.categories;
    currentCategories[key].enabled = !currentCategories[key].enabled;
    // eslint-disable-next-line no-param-reassign
    currentCategories[key].types.forEach((t) => { t.enabled = currentCategories[key].enabled; });
    this.setState({ categories: currentCategories });
  }
  // reacts to the list of types being made visible or not
  toggleCategoryTypesVisible(key) {
    const categories = this.state.categories;
    categories[key].visible = !categories[key].visible;
    this.setState({ categories });
  }
  // reacts to the checkmark being toggled on and off
  toggleType(category, type) {
    const currentType = category.types.find((t) => t.name === type.name);
    currentType.enabled = !currentType.enabled;
    this.setState({ categories: this.state.categories });
  }

  render() {
    const locateOptions = {
      position: 'topleft',
      strings: {
        title: 'Show me where I am'
      },
      initialZoomLevel: 17,
      showPopup: false,
      enableHighAccuracy: true,
      onActivate: () => {} // callback before engine starts retrieving locations
    };
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
        <div id="about-iot">{AboutButton}</div>
        <div className="map">
          <div id="mapdiv">
            <Geocoder viewportCallback={this.setViewPort} />
            <Map
              center={this.state.center}
              zoom={this.state.zoom}
              onViewportChanged={this.onViewportChanged}
              maxZoom={parseInt(process.env.MAP_MAX_ZOOM, 10)}
            >
              <LocateControl className="about-iot" options={locateOptions} />
              <WMTSTileLayer
                url={process.env.MAP_ROOT}
                layer="SG-E-Stadsplan:Stadsplan"
                tilematrixSet="SG-WEB MERCATOR"
                format="image/png"
              />
              {SearchMarker}
              {this.enabledDevices.map((device) => (
                <LMarker device={device} key={device.id} />
                ))}

            </Map>
            <MapLegend
              categories={this.state.categories}
              onCategoryToggle={(key) => this.toggleCategory(key)}
              onTypeToggle={(category, type) => this.toggleType(category, type)}
              onVisibleToggle={(key) => this.toggleCategoryTypesVisible(key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LMap;
