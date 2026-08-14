const { AppError } = require("./apperror");

class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);

    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
