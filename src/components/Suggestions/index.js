import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = (props) => {
  console.log('calling suggestions');
  console.log(props.results);
  const options = props.results.map((value) => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={() => console.log(value)} className="list-group-item list-group-item-action" key={value}>
      {value}
    </li>
  ));
  return <ul className="list-group">{options}</ul>;
};

Suggestions.propTypes = {
  results: PropTypes.array
};
export default Suggestions;
