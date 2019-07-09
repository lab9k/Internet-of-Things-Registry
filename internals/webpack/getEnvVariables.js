const dotenv = require('dotenv');

const envVars = dotenv.config().parsed || {};

module.exports = () => {
  const citySpecificEnvs = Object.entries(envVars).reduce((p, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    p[key] = JSON.stringify(value);
    return p;
  }, {});

  const envs = {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    ...citySpecificEnvs
  };

  return envs;
};
