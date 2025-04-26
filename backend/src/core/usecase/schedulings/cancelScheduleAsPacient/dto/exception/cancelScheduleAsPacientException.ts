import BadRequestException from "../../../../common/exception/core/badRequestException";

export default class CancelScheduleAsPacientException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
