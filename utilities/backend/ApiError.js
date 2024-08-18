export default class ApiError extends Error {
  constructor(
    statusCode,
    message = "Couldn't process the request at this moment."
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }
}
