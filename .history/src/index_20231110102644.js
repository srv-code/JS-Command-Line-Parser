const { log, initDebugger } = require('./debug');
const { parse } = require('./utils');

initDebugger();
// log('>>', process.argv);

function main() {
  try {
    const options = parse(process.argv);
    console.log('Parsed option', { options: JSON.stringify(options) });
  } catch (e) {
    console.error('Error:', e);
    // console.error('Error:', e.message);
  }
}

module.exports = { main };
