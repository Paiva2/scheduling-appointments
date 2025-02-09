import NotFoundException from "./core/notFoundException";

export default class UserNotFoundException extends NotFoundException {
  public constructor(msg: string) {
    super(msg);
  }
}
