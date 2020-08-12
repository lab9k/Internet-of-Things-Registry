import { readPaginatedData } from '../datareader';

export async function getLocations(string) {
  return readPaginatedData(process.env.MAP_API_ROOT + string);
}
