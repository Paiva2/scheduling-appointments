import ForbiddenException from "../../../common/exception/core/forbiddenException";

export default class WrongCredentialsException extends ForbiddenException {
  constructor() {
    const defaultMessage = "Wrong credentials.";

    super(defaultMessage);
  }
}
