const { AppError } = require("./apperror");

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 404);

    this.name = "UnauthorizedError";
  }
}
module.exports = UnauthorizedError;
