/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getLocations, getAddress } from '../../services/api/Geocoder';
import Suggestions from '../Suggestions';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  getData = (v) => {
    getLocations(`${v},Gent`)
      .then((data) => {
        this.setState({
          results: data.SuggestionResult
        });
      });
  }

  handleInputChange = () => {
    this.setState({ query: this.search.value },
      () => {
        this.getData(this.search.value);
      });
  }

  clearData = (q) => {
    getAddress(q).then(c => this.props.viewportCallback([c.LocationResult[0].Location.Lat_WGS84, c.LocationResult[0].Location.Lon_WGS84]));
    this.setState({
      query: q,
      results: []
    });
  }

  render() {
    return (
      <form className="geocoder" autoComplete="off">
        <input
          className="form-control"
          placeholder="Gent"
          value={this.state.query}
          ref={(input) => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} clearResults={this.clearData} />
      </form>
    );
  }
}

Geocoder.propTypes = {
  viewportCallback: PropTypes.func
}

export default Geocoder;
