export class UserAlreadyExistException extends Error {
  constructor() {
    super('Email already exist')
  }
}
