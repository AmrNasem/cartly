export class APIError extends Error {
  status: number;

  constructor(message = "Something went wrong!", status = 500) {
    super(message);
    this.status = status;
  }
}

export class AuthError extends APIError {
  constructor(message = "Unauthorized", status = 401) {
    super(message, status);
  }
}

export class ForbiddenError extends APIError {
  constructor(message = "Forbidden", status = 403) {
    super(message, status);
  }
}
