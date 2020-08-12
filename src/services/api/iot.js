import { readPaginatedData } from '../datareader';

let devices = null;

export async function getDevices() {
  const devicesList = [...(await readPaginatedData(process.env.API_ROOT))];

  return devicesList.map((d) => ({
    ...d,
    latitude: Number.parseFloat(d.latitude),
    longitude: Number.parseFloat(d.longitude)
  }));
}

export async function getDevice(id) {
  if (!devices) {
    devices = getDevices();
  }
  const all = await devices;
  return all.find((element) => element.id === id);
}
