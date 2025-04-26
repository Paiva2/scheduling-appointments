import { SchedulingEntity } from "../../../core/entity";
import { ISchedulingRepository } from "../../../core/interfaces/repository";
import { IPageableList } from "../../../core/interfaces/utils/IPageableList";
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

  public async findByIdAndUser(id: string, userId: string): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT sch.*,
        jsonb_build_object(
          'udc_id', udc.usr_id, 
          'udc_name', udc.usr_name, 
          'udc_email', udc.usr_email, 
          'udc_address', jsonb_build_object('id', doa.adr_id, 'street', doa.adr_street, 'neighbourhood', doa.adr_neighbourhood, 'state', doa.adr_state, 'city', doa.adr_city, 'country', doa.adr_country, 'zipcode', doa.adr_zipcode, 'house_number', doa.adr_house_number, 'complement', doa.adr_complement),
          'udc_specialism_list', (
              SELECT array_agg(jsonb_build_object('id', spe2.spe_id, 'name', spe2.spe_name)) 
              FROM tb_users_specialisms usp2
                JOIN tb_specialisms spe2 ON spe2.spe_id = usp2.usp_spe_id
              WHERE usp2.usp_user_id = udc.usr_id
            )
        ) AS user_doctor
      FROM tb_schedulings sch
        JOIN tb_users udc ON udc.usr_id = sch.sch_user_doctor_id
        JOIN tb_address doa ON doa.adr_user_id = udc.usr_id
      WHERE sch_id = $1
      AND sch_user_id = $2`,
      [id, userId]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findByIdAndDoctor(id: string, doctorId: string): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT sch.*,
        jsonb_build_object(
          'usr_id', usr.usr_id, 
          'usr_name', usr.usr_name, 
          'usr_email', usr.usr_email, 
          'usr_address', jsonb_build_object('id', adr.adr_id, 'street', adr.adr_street, 'neighbourhood', adr.adr_neighbourhood, 'state', adr.adr_state, 'city', adr.adr_city, 'country', adr.adr_country, 'zipcode', adr.adr_zipcode, 'house_number', adr.adr_house_number, 'complement', adr.adr_complement)
        ) AS user
      FROM tb_schedulings sch
        JOIN tb_users usr ON usr.usr_id = sch.sch_user_id
        JOIN tb_address adr ON adr.adr_user_id = usr.usr_id
      WHERE sch_id = $1
      AND sch_user_doctor_id = $2`,
      [id, doctorId]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findByUserAndDate(userId: string, date: Date): Promise<SchedulingEntity | null> {
    const { rows } = await pool.query(
      `SELECT * FROM tb_schedulings 
        WHERE sch_user_id = $1
        AND sch_scheduled_at = $2 
        AND sch_active IS TRUE`,
      [userId, date]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findByDoctorAndDate(doctorId: string, date: Date): Promise<SchedulingEntity | null> {
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

  public async update(scheduling: SchedulingEntity) {
    const { rows } = await pool.query(
      `UPDATE tb_schedulings SET 
        sch_informations = $1,
        sch_active = $2,
        sch_scheduled_at = $3,
        sch_finished_at = $4,
        sch_updated_at = $5
        WHERE sch_id = $6`,
      [
        scheduling.getInformations(),
        scheduling.isActive(),
        scheduling.getScheduledAt(),
        scheduling.getFinishedAt(),
        new Date(),
        scheduling.getId()!,
      ]
    );

    return SchedulingMapper.toDomain(rows[0])!;
  }

  public async findAllByUserId(
    userId: string,
    page: number,
    size: number
  ): Promise<IPageableList<SchedulingEntity>> {
    const { rows } = await pool.query(
      `
      SELECT sch.*,
      jsonb_build_object(
        'udc_id', udc.usr_id, 
        'udc_name', udc.usr_name, 
        'udc_email', udc.usr_email, 
        'udc_address', jsonb_build_object('id', doa.adr_id, 'street', doa.adr_street, 'neighbourhood', doa.adr_neighbourhood, 'state', doa.adr_state, 'city', doa.adr_city, 'country', doa.adr_country, 'zipcode', doa.adr_zipcode, 'house_number', doa.adr_house_number, 'complement', doa.adr_complement),
        'udc_specialism_list', (
            SELECT array_agg(jsonb_build_object('id', spe2.spe_id, 'name', spe2.spe_name)) 
            FROM tb_users_specialisms usp2
              JOIN tb_specialisms spe2 ON spe2.spe_id = usp2.usp_spe_id
            WHERE usp2.usp_user_id = udc.usr_id
          )
        ) AS user_doctor
      FROM tb_schedulings sch
        JOIN tb_users udc ON udc.usr_id = sch.sch_user_doctor_id
        JOIN tb_address doa ON doa.adr_user_id = udc.usr_id
      WHERE sch.sch_user_id = $1
      ORDER BY sch.sch_scheduled_at DESC
      LIMIT $3
      OFFSET ($2 - 1) * $3
      `,
      [userId, page, size]
    );

    const countQuery = await pool.query(
      `
      SELECT count(*) AS full_count FROM tb_schedulings sch
        JOIN tb_users udc ON udc.usr_id = sch.sch_user_doctor_id
        JOIN tb_address doa ON doa.adr_user_id = udc.usr_id
      WHERE sch.sch_user_id = $1
      `,
      [userId]
    );

    const count = countQuery.rows[0]?.full_count ? Number(countQuery.rows[0].full_count) : 0;

    return {
      page: page,
      size,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      data: rows.map((row) => SchedulingMapper.toDomain(row)!),
    };
  }

  public async findAllByDoctorId(
    doctorId: string,
    page: number,
    size: number
  ): Promise<IPageableList<SchedulingEntity>> {
    const { rows } = await pool.query(
      `
      SELECT sch.*,
      jsonb_build_object(
        'usr_id', usr.usr_id, 
        'usr_name', usr.usr_name, 
        'usr_email', usr.usr_email, 
        'usr_address', jsonb_build_object('id', adr.adr_id, 'street', adr.adr_street, 'neighbourhood', adr.adr_neighbourhood, 'state', adr.adr_state, 'city', adr.adr_city, 'country', adr.adr_country, 'zipcode', adr.adr_zipcode, 'house_number', adr.adr_house_number, 'complement', adr.adr_complement)
        ) AS user
      FROM tb_schedulings sch
        JOIN tb_users usr ON usr.usr_id = sch.sch_user_id
        JOIN tb_address adr ON adr.adr_user_id = usr.usr_id
      WHERE sch.sch_user_doctor_id = $1
      ORDER BY sch.sch_scheduled_at DESC
      LIMIT $3
      OFFSET ($2 - 1) * $3
      `,
      [doctorId, page, size]
    );

    const countQuery = await pool.query(
      `
      SELECT count(*) AS full_count FROM tb_schedulings sch
        JOIN tb_users usr ON usr.usr_id = sch.sch_user_id
        JOIN tb_address adr ON adr.adr_user_id = usr.usr_id
      WHERE sch.sch_user_doctor_id = $1
      `,
      [doctorId]
    );

    const count = countQuery.rows[0]?.full_count ? Number(countQuery.rows[0].full_count) : 0;

    return {
      page: page,
      size,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      data: rows.map((row) => SchedulingMapper.toDomain(row)!),
    };
  }
}
