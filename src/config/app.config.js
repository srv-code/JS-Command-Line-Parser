const { log } = require('../util/debug');

class AppModes {
  static DEMO = 'DEMO';
  static VERBOSE = 'VERBOSE';
}

const appModes = [];

/**
 * Sets the app modes
 *
 * @param {...AppModes} modes All the individual modes of the app
 *
 * @returns void
 */
function setModes(...modes) {
  /* reset config */
  appModes.length = 0;

  /* validate all values */
  for (const m of modes)
    switch (m) {
      case AppModes.DEMO:
      case AppModes.VERBOSE:
        break;

      default:
        throw new Error('Invalid value for mode: ' + m);
    }

  appModes.push(...modes);

  log('config', { appModes });
}

module.exports = { AppModes, setModes };
