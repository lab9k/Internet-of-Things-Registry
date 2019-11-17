const dotenv = require('dotenv');

const envVars = dotenv.config().parsed || {};

// return variables from .env file
module.exports = () => {
  const citySpecificEnvs = Object.entries(envVars).reduce((p, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    p[key] = JSON.stringify(value);
    return p;
  }, {});

  const envs = {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    LANGUAGES: JSON.stringify(process.env.LANGUAGES),
    DEFAULT_LOCALE: JSON.stringify(process.env.DEFAULT_LOCALE),
    CITY_NAME: JSON.stringify(process.env.CITY_NAME),
    CITY_HEADER_THUMBNAIL: JSON.stringify(process.env.CITY_HEADER_THUMBNAIL),
    API_ROOT: JSON.stringify(process.env.API_ROOT),
    MAP_ROOT: JSON.stringify(process.env.MAP_ROOT),
    MAP_MAX_ZOOM: JSON.stringify(process.env.MAP_MAX_ZOOM),
    MAP_DEFAULT_ZOOM: JSON.stringify(process.env.MAP_DEFAULT_ZOOM),
    MAP_CENTER_LATITUDE: JSON.stringify(process.env.MAP_CENTER_LATITUDE),
    MAP_CENTER_LONGITUDE: JSON.stringify(process.env.MAP_CENTER_LONGITUDE),

    ...citySpecificEnvs
  };

  return envs;
};
