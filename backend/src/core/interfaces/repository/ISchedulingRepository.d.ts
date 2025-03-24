export interface ISchedulingRepository {
  findByUserAndDoctorAndDate(
    userId: string,
    doctorId: string,
    date: Date
  ): Promise<SchedulingEntity | null>;

  findByUserAndDate(
    userId: string,
    date: Date
  ): Promise<SchedulingEntity | null>;

  findByDoctorAndDate(
    doctorId: string,
    date: Date
  ): Promise<SchedulingEntity | null>;

  persist(scheduling: SchedulingEntity);
}
