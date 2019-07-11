/**
 * TileLayer to enable using maps from the 'Danish Map Supply', https://kortforsyningen.dk/indhold/english
 */

import * as L from 'leaflet';
import { GridLayer, withLeaflet } from 'react-leaflet';

const dmsToken = '616b3ba317991e1fe63ee34a3dface67';

L.TileLayer.DanishMapSupplyTileLayer = L.TileLayer.extend({
  getTileUrl(coords) {
    const url = `https://services.kortforsyningen.dk/orto_foraar?token=${
        dmsToken
        }&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1`
      + `&TileMatrix=L${coords.z.toString().padStart(2, '0')
        }&TileRow=${coords.y
        }&TileCol=${coords.x}`;

    return url;
  }
});

L.tileLayer.danishMapSupplyTileLayer = function () {
  return new L.TileLayer.DanishMapSupplyTileLayer();
};

class Index extends GridLayer {
  createLeafletElement(props) {
    this.leafletElement = new L.tileLayer.danishMapSupplyTileLayer(props);

    return this.leafletElement;
  }
}

export default withLeaflet(Index);
