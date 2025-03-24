import BadRequestException from "../../../common/exception/core/badRequestException";

export default class DoctorSchedulingException extends BadRequestException {
  constructor() {
    const defaultMessage =
      "Doctors can't create schedulings. Sign in as an pacient and try again!";

    super(defaultMessage);
  }
}
