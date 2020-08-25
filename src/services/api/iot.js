import { readPaginatedData } from '../datareader';

let devices = null;

export async function getDevices() {
  const devicesList = [...(await readPaginatedData(process.env.API_ROOT))];
  const classes = [];
  devicesList.forEach((c) => classes.push(Object.assign(new Device(), c)));
  console.log(classes);
  // return devicesList.map((d) => ({
  //   ...d,
  //   latitude: Number.parseFloat(d.latitude),
  //   longitude: Number.parseFloat(d.longitude)
  // }));
  return classes;
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
