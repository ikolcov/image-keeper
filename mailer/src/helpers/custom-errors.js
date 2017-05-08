export class BadRequestError extends Error {
  constructor(message = 'Bad request') {
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

export default Error;
