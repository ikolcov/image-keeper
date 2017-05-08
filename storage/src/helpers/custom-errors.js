export class AuthenticationError extends Error {
  constructor(message = 'Invalid username and/or password') {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AccessDeniedError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = this.constructor.name;
  }
}

export default Error;
