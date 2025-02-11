import { GlobalException } from "./globalException";

export default class ConflictException extends GlobalException {
  constructor(message: string) {
    super(message, 409);
  }
}
