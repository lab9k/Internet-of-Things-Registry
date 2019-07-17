import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length);
const capitalizeAll = (words) => words.split(' ').map((word) => capitalize(word)).join(' ');


const LPopupMetaInfo = (props) => {
  const field = props.field;
  return (
    <div className="device-popup-information">
      <p className="device-popup-information-label">{capitalizeAll(field.title)}</p>
      <p className="device-popup-information-text">{field.value}</p>
    </div>
  );
};

LPopupMetaInfo.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired
};
export default LPopupMetaInfo;
