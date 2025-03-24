export interface IScheduling {
  sch_id: string;
  sch_user_id: string;
  sch_user_doctor_id: string;
  sch_informations: string | null;
  sch_active: boolean;
  sch_scheduled_at: Date;
  sch_finished_at: Date | null;
  sch_created_at: Date;
  sch_updated_at: Date;
}
