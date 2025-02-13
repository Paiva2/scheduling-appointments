import NotFoundException from "./core/notFoundException";

export default class SpecialismNotFoundException extends NotFoundException {
  constructor() {
    const defaultMessage = "Specialism not found!";
    super(defaultMessage);
  }
}
