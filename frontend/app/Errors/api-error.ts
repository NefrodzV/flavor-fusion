class ApiError extends Error {
  statusCode: number;
  constructor(message: string = "Api error has ocurred", status = 500) {
    super(message);
    this.message = message;
    this.name = "ApiError";
    this.statusCode = status;
  }
}
