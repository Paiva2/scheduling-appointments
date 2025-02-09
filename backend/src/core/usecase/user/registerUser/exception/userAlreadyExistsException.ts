import ConflictException from "../../common/exception/core/conflictException";

export default class UserAlreadyExistsException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
