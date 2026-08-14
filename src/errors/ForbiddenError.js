const { AppError } = require("./apperror");

class ForbiddenError extends AppError {
  constructor(message) {
    super(message, 403);

    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
