const OPTIONS = Object.freeze([
  Object.freeze({
    id: 'FILENAME',
    required: false,
    short: 'f',
    long: 'file-name',
    description: 'Provide file name',
  }),
  Object.freeze({
    id: 'COUNT',
    required: true,
    short: 'n',
    long: 'count',
    description: 'Provide count',
  }),
  Object.freeze({
    id: 'VER',
    required: false,
    short: 'v',
    long: 'version',
    description: 'Show version info',
  }),
  Object.freeze({
    id: 'HELP',
    required: false,
    short: 'h',
    long: 'help',
    description: 'Show help document',
  }),
]);

// console.log(OPTIONS, typeof OPTIONS);
// console.log(Object.freeze(OPTIONS));
// Object.freeze(OPTIONS);

module.exports = { OPTIONS };
