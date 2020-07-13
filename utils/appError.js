class AppError extends Error {
    constructor(message, statusCode=500) {
      super(message);
      this.statusCode = statusCode 
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  
      this.operational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;