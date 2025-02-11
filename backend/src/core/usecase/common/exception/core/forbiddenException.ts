import { GlobalException } from "./globalException";

export default class ForbiddenException extends GlobalException {
  constructor(message: string) {
    super(message, 403);
  }
}
