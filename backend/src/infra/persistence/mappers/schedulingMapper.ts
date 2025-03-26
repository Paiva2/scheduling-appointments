import {
  AddressEntity,
  SchedulingEntity,
  SpecialismEntity,
  UserEntity,
  UserSpecialismEntity,
} from "../../../core/entity";
import { IScheduling } from "../entity/IScheduling";

export class SchedulingMapper {
  public static toDomain(scheduling: IScheduling): SchedulingEntity | null {
    if (scheduling == null) return null;

    const schedulingDomain = new SchedulingEntity(
      scheduling.sch_id,
      null,
      null,
      scheduling.sch_informations,
      scheduling.sch_active,
      scheduling.sch_scheduled_at,
      scheduling.sch_finished_at,
      scheduling.sch_created_at,
      scheduling.sch_updated_at
    );

    if (!!scheduling.user_doctor) {
      const userDoctor = new UserEntity(
        scheduling.user_doctor.udc_id,
        scheduling.user_doctor.udc_name,
        scheduling.user_doctor.udc_email,
        "",
        null,
        null,
        null,
        null
      );

      schedulingDomain.setUserDoctor(userDoctor);

      if (!!scheduling.user_doctor.udc_address) {
        const doctorAddress = new AddressEntity(
          scheduling.user_doctor.udc_address.id,
          scheduling.user_doctor.udc_address.street,
          scheduling.user_doctor.udc_address.neighbourhood,
          scheduling.user_doctor.udc_address.state,
          scheduling.user_doctor.udc_address.city,
          scheduling.user_doctor.udc_address.country,
          scheduling.user_doctor.udc_address.zipcode,
          scheduling.user_doctor.udc_address.house_number,
          scheduling.user_doctor.udc_address.complement,
          scheduling.user_doctor.udc_id,
          null
        );

        schedulingDomain.getUserDoctor()?.setAddress(doctorAddress);
      }

      if (!!scheduling.user_doctor.udc_specialism_list) {
        const doctorSpecialismsDomain: UserSpecialismEntity[] = [];

        scheduling.user_doctor.udc_specialism_list.forEach((specialism) => {
          const doctorSpecialism = new UserSpecialismEntity(
            scheduling.user_doctor!.udc_id,
            specialism.id,
            null,
            null,
            new SpecialismEntity(specialism.id, specialism.name, null)
          );

          doctorSpecialismsDomain.push(doctorSpecialism);
        });

        schedulingDomain.getUserDoctor()?.setuserSpecialisms(doctorSpecialismsDomain);
      }
    }

    if (!!scheduling.user) {
      const userDoctor = new UserEntity(
        scheduling.user.usr_id,
        scheduling.user.usr_name,
        scheduling.user.usr_email,
        "",
        null,
        null,
        null,
        null
      );

      schedulingDomain.setUser(userDoctor);

      if (!!scheduling.user.usr_address) {
        const doctorAddress = new AddressEntity(
          scheduling.user.usr_address.id,
          scheduling.user.usr_address.street,
          scheduling.user.usr_address.neighbourhood,
          scheduling.user.usr_address.state,
          scheduling.user.usr_address.city,
          scheduling.user.usr_address.country,
          scheduling.user.usr_address.zipcode,
          scheduling.user.usr_address.house_number,
          scheduling.user.usr_address.complement,
          scheduling.user.usr_id,
          null
        );

        schedulingDomain.getUser()?.setAddress(doctorAddress);
      }
    }

    return schedulingDomain;
  }
}
