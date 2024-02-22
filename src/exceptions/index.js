class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

class PreprocessingError extends ClientError {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
    this.name = 'PreprocessingError';
  }
}

class PredictError extends ClientError {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
    this.name = 'PredictError';
  }
}

export {
  ClientError, PredictError, PreprocessingError,
};
