import { SchedulingEntity } from "../../entity";

export interface ISchedulingRepository {
  findByUserAndDoctorAndDate(userId: string, doctorId: string, date: Date): Promise<SchedulingEntity | null>;

  findByUserAndDate(userId: string, date: Date): Promise<SchedulingEntity | null>;

  findByDoctorAndDate(doctorId: string, date: Date): Promise<SchedulingEntity | null>;

  findAllByUserId(userId: string, page: number, size: number): Promise<IPageableList<SchedulingEntity>>;

  findAllByDoctorId(userId: string, page: number, size: number): Promise<IPageableList<SchedulingEntity>>;

  persist(scheduling: SchedulingEntity);
}
