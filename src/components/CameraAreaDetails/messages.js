import { defineMessages } from 'react-intl';

export const scope = 'IoTRegister.components.CameraAreaDetails';

export default defineMessages({
  device: {
    id: `${scope}.device`,
    defaultMessage: 'Device',
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: 'Category'
  },
  area: {
    id: `${scope}.area`,
    defaultMessage: 'Camera surveillance zone',
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Type',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Unknown',
  },
});
