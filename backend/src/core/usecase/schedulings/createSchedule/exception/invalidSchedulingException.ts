import BadRequestException from "../../../common/exception/core/badRequestException";

export default class InvalidSchedulingException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
