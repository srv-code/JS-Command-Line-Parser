const { OPTIONS } = require('./data');
const { log } = require('./debug');
const {
  IllegalOptionValueException,
  InvalidArgumentException,
  InternalError,
} = require('./errors');

const optionsProvided = [];

/**
 * @param {string|string[]} string Can be a short option string, or a long string, or a value for an option
 * @param {Object} config Configuration for option
 * @param {boolean} config.isShort Tells if `string` is a short option
 * @param {boolean} config.isValue Tells if `string` is an option value
 * @param {string|null} config.valueFor Tells that the `string` is the value for which option
 *
 * @throws IllegalOptionValueException
 */
function registerOption(
  string,
  { isShort = false, isValue = false, valueFor = null }
) {
  log('registerOption::init', arguments);

  if (!string) throw new InternalError('!isValue', { string });
  if (isValue !== !!valueFor)
    throw new InternalError('isValue !== !valueFor', {
      isValue,
      valueFor,
      isShort,
      string,
    });
  // let _option
  // let _currentOption

  if (isValue) {
    const presentOption = optionsProvided.find(
      o => o.long === valueFor || o.short === valueFor
    );
    if (presentOption) {
      if (Array.isArray(presentOption.value)) presentOption.value.push(string);
      else presentOption.value = [string];
    } else {
      const foundOption = OPTIONS.find(
        o => o.long === valueFor || o.short === valueFor
      );
      optionsProvided.push({ ...foundOption, value: [string] });
    }
  } else if (isShort) {
    /* NOTE: `string` will always be an array  */
    for (const opChar of string) {
      const foundOption = OPTIONS.find(o => o.short === opChar);
      if (foundOption) optionsProvided.push({ ...foundOption });
      else throw new InvalidArgumentException(opChar);
    }
  } else {
    /* NOTE: Is long option */
    // log('registerOption:: for long', { OPTIONS });

    const foundOption = OPTIONS.find(o => o.long === string);

    log('registerOption:: for long', { foundOption, optionsProvided, string });

    if (foundOption) optionsProvided.push({ ...foundOption });
    else throw new InvalidArgumentException(string);
  }
}

/**
 * Checks for
 *   - duplicate entries
 *   - required values for options
 *
 * @throws IllegalOptionValueException
 */
function validateOptionsAndValues() {
  const keys = [];
  for (const op of optionsProvided) {
    if (keys.includes(op.id))
      throw new IllegalOptionValueException(
        'Duplicate option value',
        op.description
      );

    if (op.required && !op.value)
      throw new IllegalOptionValueException(
        'Missing mandatory option value',
        op.description
      );

    keys.push(op.id);
  }
}

/**
 * Parses the node argument vector
 *
 * @param argv {string[]} Unmodified node argument vector
 *
 * @returns {object[]} Option array parsed from command line string
 *
 * @throws InvalidArgumentException
 */
function parse(argv) {
  // OPTIONS[0].id = 1;
  // OPTIONS.push('xxxx');
  // console.log('??', { OPTIONS });

  for (let i = 2, valueFor = null; i < argv.length; i++) {
    log('>>', i, argv[i]);
    // const arg = argv[i];

    let isShort = false;
    let isValue = false;

    // const _l = '--long';
    // console.log(_l.substring(2));
    // const _s = '-short';
    // const _e = '-';
    // console.log('%%', _e[0], _e[1]);

    if (argv[i][0] === '-' && argv[i][1] !== '-') {
      /* NOTE: Short option */
      if (!argv[i][1]) throw new InvalidArgumentException(argv[i]);
      isShort = true;
      valueFor = null;
      // receiveValueFor = false;
    } else if (argv[i].startsWith('--')) {
      /* NOTE: Long option */
      if (!argv[i][2]) throw new InvalidArgumentException(argv[i]);
      valueFor = null;
      // isLong = true;
      // receiveValueFor = argv[i].substring(2);
    } else {
      /* NOTE: Option value */
      isValue = true;
      if (!valueFor) {
        if (i === 2) throw new InvalidArgumentException(argv[i]);
        valueFor = argv[i - 1].substring(argv[i - 1].startsWith('--') ? 2 : 1);
      }
    }

    // if(!value)
    // receiveValueFor = short ? null : argv[i].substring(2);
    // if(receiveValueFor)

    // console.log(
    //   'asdghjk'.split('')
    // );

    let optionString;
    if (isValue) optionString = argv[i];
    else if (isShort) optionString = argv[i].substring(1).split('');
    else optionString = argv[i].substring(2);

    if (!optionString)
      throw new InternalError('!optionString', { arg: argv[i] });

    registerOption(optionString, {
      isShort,
      isValue,
      valueFor,
    });

    // if (isShort) {
    //   for (let j = 1; j < argv[i].length; j++) {
    //     registerOption(argv[i][j], {isShort, isValue});
    //   }
    // } else if (isValue) {
    //   registerOption(isValue, { valueFor: receiveValueFor });
    // }
  }

  validateOptionsAndValues();

  return optionsProvided;
}

module.exports = { parse };
