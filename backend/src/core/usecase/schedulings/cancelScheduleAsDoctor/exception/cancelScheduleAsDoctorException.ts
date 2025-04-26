import BadRequestException from "../../../common/exception/core/badRequestException";

export default class CancelScheduleAsDoctorException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
