import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = (props) => {
  console.log('calling suggestions');
  console.log(props.results);
  const options = props.results.map((value) => (
    <li key={value}>
      {value}
    </li>
  ));
  return <ul>{options}</ul>;
};

Suggestions.propTypes = {
  results: PropTypes.array
};
export default Suggestions;
