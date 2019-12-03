/*
 * Map Marker Messages
 *
 * This contains all the text for the LeafletMarker component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'IoTRegister.components.LeafletMarker';

export default defineMessages({
  device: {
    id: `${scope}.device`,
    defaultMessage: 'Device'
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: 'Category'
  },
  types: {
    id: `${scope}.types`,
    defaultMessage: 'Types'
  },
  organisation: {
    id: `${scope}.organisation`,
    defaultMessage: 'Organisation'
  },
  reference: {
    id: `${scope}.reference`,
    defaultMessage: 'Reference'
  },
  application: {
    id: `${scope}.application`,
    defaultMessage: 'Application'
  }
});
