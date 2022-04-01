const ValidationException = (errCode, errMessage) => {
  this.errCode = errCode;
  this.errMessage = errMessage;
};

const throwIfValidationFailed = (expression, errCode, errMessage) => {
  if (!expression) {
    throw new ValidationException(errCode, errMessage);
  }
};

module.exports = { ValidationException, throwIfValidationFailed };
