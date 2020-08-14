import React from 'react';
import { Card } from 'reactstrap';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import './style.scss';
import messages from './messages';
import { getMarker } from '../../static/marker';

const createIcon = (device) =>
  new L.Icon({
    ...(getMarker(device.category))
  });


const LMarker = (props) => {
  const device = props.device;
  const deviceIcon = createIcon(device);
  const devicePosition = [device.latitude, device.longitude];
  const {
    intl: { formatMessage }
  } = props;
  const dataProcessingLabel = formatMessage(messages.data_processing);
  const dataOwnerLabel = formatMessage(messages.data_owner);
  const retentionLabel = formatMessage(messages.retention);
  const linkLabel = formatMessage(messages.link_text);
  return (
    <Marker position={devicePosition} icon={deviceIcon} key={device.id}>
      <Popup>
        <Card>
          <div className="card-body">
            <div className="card-title border-bottom mb-1"><h3><b>{device.title}</b></h3></div>
            <div className="col px-0">
              <div className="row pb-0 border-bottom">
                <div className="col">
                  <h3><i>{device.category}</i></h3>
                </div>
                <div className="col">
                  <h3><i>{device.type}</i></h3>
                </div>
              </div>
              <div className="data-processing border-bottom pb-1 pl-1 pr-1 pt-2 mt-1 rounded">
                <h6 className="text-muted card-subtitle mb-2">{dataProcessingLabel}</h6>
                <p className="card-text mt-auto">{device.dataprocessing}</p>
              </div>
              <div className="data-processing border-bottom pb-1 pl-1 pr-1 pt-2 mt-1 rounded">
                <h6 className="text-muted card-subtitle mb-2">{dataOwnerLabel}</h6>
                <p className="card-text mt-auto" style={{ fontSize: '14px' }}>{device.dataowner}</p>
              </div>
              <div className="data-processing border-bottom pb-1 pl-1 pr-1 pt-2 mt-1 mb-1 rounded">
                <h6 className="text-muted card-subtitle mb-2">{retentionLabel}</h6>
                <p className="card-text mt-auto" style={{ fontSize: '14px' }}>{device.retention}</p>
              </div>
              <a className="card-link mt-2" href={device.link}>{linkLabel}</a>
            </div>
          </div>
        </Card>
      </Popup>
    </Marker>
  );
};

LMarker.propTypes = {
  device: PropTypes.shape({
    title: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string.isRequired,
    dataowner: PropTypes.string,
    dataprocessing: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.string,
    retention: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(LMarker);
