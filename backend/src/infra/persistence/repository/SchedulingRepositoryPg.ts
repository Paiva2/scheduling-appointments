import { SchedulingEntity } from "../../../core/entity";
import { ISchedulingRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import { SchedulingMapper } from "../mappers/schedulingMapper";

export default class SchedulingRepositoryPg implements ISchedulingRepository {
  public async findByUserAndDoctorAndDate(
    userId: string,
    doctorId: string,
    date: Date
  ): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT * FROM tb_schedulings 
        WHERE sch_user_id = $1
        AND sch_user_doctor_id = $2
        AND sch_scheduled_at = $3
        AND sch_active IS TRUE`,
      [userId, doctorId, date]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findByUserAndDate(
    userId: string,
    date: Date
  ): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT * FROM tb_schedulings 
        WHERE sch_user_id = $1
        AND sch_scheduled_at = $2 
        AND sch_active IS TRUE`,
      [userId, date]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findByDoctorAndDate(
    doctorId: string,
    date: Date
  ): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT * FROM tb_schedulings 
        WHERE sch_user_doctor_id = $1 
        AND sch_scheduled_at = $2 
        AND sch_active IS TRUE`,
      [doctorId, date]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async persist(scheduling: SchedulingEntity) {
    const { rows } = await pool.query(
      `INSERT INTO tb_schedulings (sch_user_id, sch_user_doctor_id, sch_informations, sch_scheduled_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [
        scheduling.getUser()!.getId(),
        scheduling.getUserDoctor()!.getId(),
        scheduling.getInformations(),
        scheduling.getScheduledAt(),
      ]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }
}
