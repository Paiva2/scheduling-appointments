import NotFoundException from "./core/notFoundException";

export default class SchedulingNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
