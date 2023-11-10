const {
  AppModes,
  setModes,
  isModeSet,
  addModes,
} = require('./config/app.config');
const { log, initDebugger } = require('./util/debug');
const { parse } = require('./util/utils');

// initDebugger();
// log('>>', process.argv);

addModes(AppModes.DEMO);
// log('has mode', isModeSet(AppModes.VERBOSE));
// setModes(AppModes.VERBOSE);
// log('has mode', isModeSet(AppModes.VERBOSE));

try {
  const options = parse(process.argv);
  console.log('Parsed option', { options: JSON.stringify(options) });
} catch (e) {
  console.error('Error:', e);
  // console.error('Error:', e.message);
}
