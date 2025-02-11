import NotFoundException from "./core/notFoundException";

export default class AddressNotFoundException extends NotFoundException {
  constructor() {
    const defaultMessage = "Address not found!";

    super(defaultMessage);
  }
}
