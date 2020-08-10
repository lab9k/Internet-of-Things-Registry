import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import categories from '../../static/categories';
import './style.scss';
import messages from './messages';


const createIcon = (device) =>
  new L.Icon({
    ...(categories[device.application] || categories.Sensor)
  });

const LMarker = (props) => {
  const device = props.device;
  const deviceIcon = createIcon(device);
  const devicePosition = [device.latitude, device.longitude];
  const {
    intl: { formatMessage }
  } = props;
  const deviceLabel = formatMessage(messages.device);
  // const categoryLabel = formatMessage(messages.category);
  // const typeLabel = formatMessage(messages.types);
  const dataProcessingLabel = formatMessage(messages.data_processing);
  // const dataOwnerLabel = formatMessage(messages.data_owner);
  // const retentionLabel = formatMessage(messages.retention);
  return (
    <Marker position={devicePosition} icon={deviceIcon} key={device.id}>
      <Popup>
        <Card>
          <CardBody>
            <CardTitle className="text-left border-bottom"><h3>{deviceLabel}</h3></CardTitle>
            <div className="container px-0">
              <div className="col px-0">
                <div className="row">
                  <h4 className="col">{device.category}</h4>
                  <h4 className="col">{device.type}</h4>
                </div>
                <h6>{dataProcessingLabel}</h6>
                <div>
                  <p>{device.dataprocessing}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* <div className="device-popup">*/}
        {/*  <h3>{deviceLabel}</h3>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{deviceLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.title}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{categoryLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.category}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{typeLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.type}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{dataProcessingLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.dataprocessing}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{dataOwnerLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.dataowner}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="device-popup-information">*/}
        {/*    <p className="device-popup-information-label">{retentionLabel}</p>*/}
        {/*    <p className="device-popup-information-text">*/}
        {/*      {device.retention}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/* </div>*/}
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
