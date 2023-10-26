class InternalError extends Error {
  constructor(message, ...extras) {
    super(`${message} ${JSON.stringify(extras)}`);
  }
}

class IllegalOptionValueException extends Error {
  constructor(msg, option, value = null) {
    super(`${msg}. Option=${option}, Value=${value}`);
    this.option = option;
    this.msg = msg;
    this.value = value;
  }
}

class InvalidArgumentException extends Error {
  constructor(arg) {
    super(`Invalid argument: ${arg}`);
    this.arg = arg;
  }
}

module.exports = {
  InternalError,
  IllegalOptionValueException,
  InvalidArgumentException,
};
