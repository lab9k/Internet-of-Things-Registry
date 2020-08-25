import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { Checkbox } from '../../shared/components/checkbox';

import CollapseIcon from '../../images/icon-arrow-down.svg';
import ExpandIcon from '../../images/icon-arrow-up.svg';
import MapLayersIcon from '../../images/icon-map-layers.svg';

import messages from './messages';
import './style.scss';
import { getMarker, getTypeMarker } from '../../services/api/marker';

class MapLegend extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLegendVisible: window.innerWidth > 576 };
  }

  getCategoryDivs(category, id) {
    return (
      <div key={category.name} className="col">
        <div className="row">
          <Checkbox
            name="check"
            checked={category.enabled}
            onChange={() => this.props.onCategoryToggle(id)}
          />
          <span className="map-legend__icon">
            <img className="map-legend__icon" src={getMarker(category.name).iconUrl} alt="" />
          </span>
          <span className="map-legend__row-title">{category.name}</span>
        </div>
        {this.getTypeDivs(category, id)}
      </div>);
  }

  getTypeDivs(category) {
    const typeDivs = [];
    category.types.forEach((t) => typeDivs.push(
      <div key={t.name} className="ml-3 row p-1">
        <Checkbox
          name="check"
          checked={t.enabled}
          onChange={() => this.props.onTypeToggle(category, t)}
        />
        <span className="map-legend__icon">
          <img className="map-legend__icon" src={getTypeMarker(category.name, t.name).iconUrl} alt="" />
        </span>
        <span className="map-legend__row-title">{t.name}</span>
      </div>));
    return typeDivs;
  }

  render() {
    const checkboxList = Object.entries(this.props.categories).map(
      ([id, category]) => this.getCategoryDivs(category, id)
    );

    const { isLegendVisible } = this.state;
    const {
      intl: { formatMessage }
    } = this.props;
    const ariaLabel = `${formatMessage(messages.title)}, ${
      isLegendVisible
        ? formatMessage(messages.hide)
        : formatMessage(messages.show)
    }`;

    return (
      <section
        id="map-legend"
        aria-label={ariaLabel}
        aria-expanded={isLegendVisible}
        className={`
          map-legend
          map-legend--${isLegendVisible ? 'expanded' : 'collapsed'}
        `}
      >
        <button
          className="map-legend__header"
          onClick={() => this.setState({ isLegendVisible: !isLegendVisible })}
          title={
            isLegendVisible
              ? formatMessage(messages.hide)
              : formatMessage(messages.show)
          }
        >
          <MapLayersIcon className="map-legend__header-icon" />
          <h4 className="map-legend__header-title" aria-hidden="true">
            {formatMessage(messages.devices)}
          </h4>
          <CollapseIcon className="map-legend__header-icon map-legend__header-icon--expanded" />
          <ExpandIcon className="map-legend__header-icon map-legend__header-icon--collapsed" />
        </button>
        <div className="map-legend__body">{checkboxList}</div>
      </section>
    );
  }
}

MapLegend.propTypes = {
  categories: PropTypes.array,
  intl: intlShape.isRequired,
  onCategoryToggle: PropTypes.func,
  onTypeToggle: PropTypes.func
};

export default injectIntl(MapLegend);
