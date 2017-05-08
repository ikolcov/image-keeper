export class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'You are not authorized') {
    super(message);
    this.name = this.constructor.name;
  }
}

export default Error;
