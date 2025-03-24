import { SchedulingEntity } from "../../../core/entity";
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

    return schedulingDomain;
  }
}
