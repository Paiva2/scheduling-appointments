import { GlobalException } from "./globalException";

export default class BadRequestException extends GlobalException {
  constructor(message: string) {
    super(message, 400);
  }
}
