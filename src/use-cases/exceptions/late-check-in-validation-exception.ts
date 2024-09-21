export class LateCheckInValidationException extends Error {
  constructor() {
    super('The checkin can only be validation until 20 minutes of its creation')
  }
}
