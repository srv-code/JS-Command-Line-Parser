const { log, initDebugger } = require('./debug');
const { parse } = require('./utils');

initDebugger();
// log('>>', process.argv);

try {
  const options = parse(process.argv);
  console.log('Parsed option', { options });
} catch (e) {
  console.error('Error:', e);
  // console.error('Error:', e.message);
}
