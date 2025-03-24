import pool from "./connection";

export default async function dbInit() {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS tb_users (
            usr_id uuid default gen_random_uuid() primary key,
            usr_name varchar(50) not null,
            usr_email varchar(100) not null unique,
            usr_password varchar(250) not null,
            usr_created_at timestamp not null default now()
          );

          CREATE TABLE IF NOT EXISTS tb_address (
            adr_id uuid default gen_random_uuid() primary key,
            adr_street varchar(50) not null,
            adr_neighbourhood varchar(50) not null,
            adr_state varchar(20) not null,
            adr_city varchar(20) not null,
            adr_country varchar(20) not null,
            adr_zipcode varchar(20) not null,
            adr_house_number varchar(10) not null,
            adr_complement varchar(100),
            adr_user_id UUID unique not null references tb_users(usr_id) on delete cascade,
            adr_created_at timestamp not null default now()
          );

          CREATE TABLE IF NOT EXISTS tb_roles (
            rl_id uuid default gen_random_uuid() primary key,
            rl_name varchar(15) not null unique,
            rl_created_at timestamp not null default now()
          );

          CREATE TABLE IF NOT EXISTS tb_specialisms (
            spe_id uuid default gen_random_uuid() primary key,
            spe_name varchar(20) not null unique,
            spe_created_at timestamp not null default now()
          );

          CREATE TABLE IF NOT EXISTS tb_users_roles (
            usl_user_id UUID not null references tb_users(usr_id) on delete cascade,
            usl_role_id UUID not null references tb_roles(rl_id) on delete cascade,
            usl_created_at timestamp not null default now(),
            CONSTRAINT pk_users_roles primary key (usl_user_id, usl_role_id)
          );

          CREATE TABLE IF NOT EXISTS tb_users_specialisms (
            usp_user_id UUID not null references tb_users(usr_id) on delete cascade,
            usp_spe_id UUID not null references tb_specialisms(spe_id) on delete cascade,
            usp_created_at timestamp not null default now(),
            CONSTRAINT pk_users_specialisms primary key (usp_user_id, usp_spe_id)
          );

          CREATE TABLE IF NOT EXISTS tb_schedulings (
            sch_id uuid default gen_random_uuid() primary key,
            sch_user_id UUID not null references tb_users(usr_id) on delete cascade,
            sch_user_doctor_id UUID not null references tb_users(usr_id) on delete cascade,
            sch_informations varchar(500) default null,
            sch_active boolean not null default true,
            sch_scheduled_at timestamp not null,
            sch_finished_at timestamp,
            sch_created_at timestamp not null default now(),
            sch_updated_at timestamp not null default now()
          );

          INSERT INTO tb_roles (rl_name)
          values('USER'),
                ('DOCTOR'),
                ('ADMIN')
          on conflict do nothing;

          INSERT INTO tb_specialisms (spe_name)
          values('CARDIOLOGY'),
                ('NEUROLOGY'),
                ('CARDIOLOGY'),
                ('DERMATOLOGY'),
                ('PEDIATRICS'),
                ('ORTHOPEDICS') 
          on conflict do nothing;
      `);
  } catch (e) {
    console.error(e);
    console.log("Error while creating initial tables...");
  }
}
