/* eslint-disable */
import React from 'react';
import { getLocations } from '../../services/api/Geocoder';
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

  render() {
    return (
      <form className="geocoder" autoComplete="off">
        <input
          placeholder="Gent"
          ref={(input) => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default Geocoder;
