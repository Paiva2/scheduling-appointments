import NotFoundException from "./core/notFoundException";

export default class RoleNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
