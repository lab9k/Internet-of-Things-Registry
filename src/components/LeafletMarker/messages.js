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
  data_owner: {
    id: `${scope}.data_owner`,
    defaultMessage: 'Data owner'
  },
  data_processing: {
    id: `${scope}.data_processing`,
    defaultMessage: 'Data processing'
  },
  retention: {
    id: `${scope}.retention`,
    defaultMessage: 'Retention'
  },
  link_text: {
    id: `${scope}.link_text`,
    defaultMessage: 'MORE INFORMARTION ABOUT GDPR'
  }
});
