function importAll(r) {
  const images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

/*
* For adding types you must add a .pmg image with the same name as the category or type IN LOWERCASE
* in the public/images folder. The programme will attempt to load a corresponding type or category.
* If no type image is found it will fall back to the category type. If no category type is found it will
* fallback to a letter.
* TODO: add the fallback letter images.
* */

export const markers = importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));
const ICON_PATH = 'assets/';

function getLetterMarker(category) {
  const firstLetter = `${ICON_PATH}${category.charAt(0).toLowerCase()}.png`;
  return {
    iconSize: [25, 25],
    popupAnchor: [0, 0],
    visible: true,
    name: category,
    iconUrl: firstLetter
  };
}

export function getMarker(category) {
  const categoryMarker = `${ICON_PATH}${category.toLowerCase()}.png`;
  if (!markers[`${category.toLowerCase()}.png`]) {
    return getLetterMarker(category);
  }
  return {
    iconSize: [25, 25],
    popupAnchor: [0, 0],
    visible: true,
    name: category,
    iconUrl: categoryMarker
  };
}
// checks if there is a specific type marker otherwise returns the category marker
export function getTypeMarker(category, type) {
  const typeMarker = `${ICON_PATH}${type.toLowerCase()}.png`;
  if (!markers[`${type.toLowerCase()}.png`]) {
    return getMarker(category);
  }
  return {
    iconSize: [25, 25],
    popupAnchor: [0, 0],
    visible: true,
    name: type,
    iconUrl: typeMarker
  };
}
