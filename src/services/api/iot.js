import { readPaginatedData } from '../datareader';
import { importAll } from './marker';

let devices = null;

export async function getDevices() {
  const csvList = importAll(require.context('../../../public/csv', false, /\.(csv)$/));
  const devicesList = [...(await readPaginatedData(process.env.API_ROOT))];
  const classes = [];
  devicesList.forEach((c) => classes.push(Object.assign(new Device(), c)));
  Object.values(csvList).forEach((csv) => csv.forEach((c) =>
    classes.push(
      Object.assign(new Device(), c, { id: randomID(15) }))));
  return classes;
}
function randomID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export async function getDevice(id) {
  if (!devices) {
    devices = getDevices();
  }
  const all = await devices;
  return all.find((element) => element.id === id);
}
export class Device {
  constructor(id, title, category, type, dataowner, dataprocessing, link, retention, latitude, longitude) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.type = type;
    this.dataowner = dataowner;
    this.dataprocessing = dataprocessing;
    this.link = link;
    this.retention = retention;
    this.latitude = this.parseGeoLoc(latitude);
    this.longitude = this.parseGeoLoc(longitude);
  }
  parseGeoLoc(float) {
    if (float === undefined) { return 0; }
    return Number.parseFloat(float);
  }
}
