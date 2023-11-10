const { setModes, AppModes } = require('./config/app.config');
const { log, initDebugger } = require('./util/debug');
const { parse } = require('./util/utils');

initDebugger();
// log('>>', process.argv);
setModes(AppModes.DEMO, AppModes.VERBOSE);

try {
  const options = parse(process.argv);
  console.log('Parsed option', { options: JSON.stringify(options) });
} catch (e) {
  console.error('Error:', e);
  // console.error('Error:', e.message);
}
