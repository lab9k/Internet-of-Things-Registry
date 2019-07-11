import { defineMessages } from 'react-intl';

export const scope = 'IoTRegister.components.DeviceDetails';

export default defineMessages({
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
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
  contact_owner: {
    id: `${scope}.contact_owner`,
    defaultMessage: 'Contact the owner',
  },
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Device details',
  },
});
