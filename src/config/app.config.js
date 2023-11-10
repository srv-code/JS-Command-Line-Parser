const { log } = require('../util/debug');

class AppModes {
  static DEMO = 'DEMO';
  static VERBOSE = 'VERBOSE';

  /**
   * Checks for a valid value
   *
   * @param {AppModes[]} modes
   *
   * @throws Error
   */
  static validate(modes) {
    for (const m of modes) {
      switch (m) {
        case AppModes.DEMO:
        case AppModes.VERBOSE:
          break;

        default:
          throw new Error('Invalid value for mode: ' + m);
      }
    }
  }
}

/**
 * Contains the current mode config of the app
 * It is a protected member as the same can be manipulated from the outside directly.
 * Provided getters and setters using functions.
 */
const appModes = [];

/**
 * Sets the app modes
 *
 * @param {...AppModes} modes All the individual modes of the app
 *
 * @throws Error
 */
function setModes(...modes) {
  appModes.length = 0;

  addModes(...modes);
}

/**
 * Adds one or more modes
 *
 * @param {...AppModes} modes All the individual modes of the app
 *
 * @returns undefined
 *
 * @throws Error
 */
function addModes(...modes) {
  AppModes.validate(modes);

  appModes.push(...modes);

  log('config', { appModes });
}

/**
 * Tells if a mode set for the current config
 *
 * @param {AppModes|string} mode
 *
 * @returns Boolean
 */
function isModeSet(mode) {
  return appModes.includes(mode);
}

module.exports = { AppModes, setModes, addModes, isModeSet };
