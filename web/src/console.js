/*eslint no-console: "off"*/
/*global console*/

const log = key => value => {
  console.log(key, value);
};

const error = value => {
  console.error(value);
};

export default {
  log: log,
  error: error
};
