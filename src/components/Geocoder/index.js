/* eslint-disable */
import React from 'react';
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
    getAddress(q).then(c => console.log(c));
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

export default Geocoder;
