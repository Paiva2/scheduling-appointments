import BadRequestException from "./core/badRequestException";

export default class InvalidFieldException extends BadRequestException {
  constructor(message: string) {
    const messageDefault = "Invalid field!";

    super(`${messageDefault} ${message}`);
  }
}
