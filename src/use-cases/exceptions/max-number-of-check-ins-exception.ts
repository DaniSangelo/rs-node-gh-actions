export class MaxNumberOfCheckInsException extends Error {
  constructor() {
    super('Max number of checkins reached')
  }
}
