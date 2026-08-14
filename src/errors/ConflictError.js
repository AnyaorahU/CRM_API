const { AppError } = require("./apperror");

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);

    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
