import pool from "./connection";

export default async function dbInit() {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS tb_users (
            usr_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            usr_name varchar(50) NOT NULL,
            usr_email varchar(100) NOT NULL UNIQUE,
            usr_password varchar(250) NOT NULL,
            usr_created_at timestamp NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS tb_address (
            adr_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            adr_street varchar(50) NOT NULL,
            adr_neighbourhood varchar(50) NOT NULL,
            adr_state varchar(20) NOT NULL,
            adr_city varchar(20) NOT NULL,
            adr_country varchar(20) NOT NULL,
            adr_zipcode varchar(20) NOT NULL,
            adr_house_number varchar(10) NOT NULL,
            adr_complement varchar(100),
            adr_user_id UUID UNIQUE NOT NULL REFERENCES tb_users(usr_id) ON DELETE CASCADE,
            adr_created_at timestamp NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS tb_roles (
            rl_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            rl_name varchar(15) NOT NULL UNIQUE,
            rl_created_at timestamp NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS tb_specialisms (
            spe_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            spe_name varchar(20) NOT NULL UNIQUE,
            spe_created_at timestamp NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS tb_users_roles (
            usl_user_id UUID NOT NULL REFERENCES tb_users(usr_id) ON DELETE CASCADE,
            usl_role_id UUID NOT NULL REFERENCES tb_roles(rl_id) ON DELETE CASCADE,
            usl_created_at timestamp NOT NULL DEFAULT NOW(),
            CONSTRAINT pk_users_roles PRIMARY KEY (usl_user_id, usl_role_id)
          );

          CREATE TABLE IF NOT EXISTS tb_users_specialisms (
            usp_user_id UUID NOT NULL REFERENCES tb_users(usr_id) ON DELETE CASCADE,
            usp_spe_id UUID NOT NULL REFERENCES tb_specialisms(spe_id) ON DELETE CASCADE,
            usp_created_at timestamp NOT NULL DEFAULT NOW(),
            CONSTRAINT pk_users_specialisms PRIMARY KEY (usp_user_id, usp_spe_id)
          );

          INSERT INTO tb_roles (rl_name)
          VALUES('USER'),
                ('DOCTOR'),
                ('ADMIN')
          ON CONFLICT DO NOTHING;

          INSERT INTO tb_specialisms (spe_name)
          VALUES('CARDIOLOGY'),
                ('NEUROLOGY'),
                ('CARDIOLOGY'),
                ('DERMATOLOGY'),
                ('PEDIATRICS'),
                ('ORTHOPEDICS') 
          ON CONFLICT DO NOTHING;
      `);
  } catch (e) {
    console.error(e);
    console.log("Error while creating initial tables...");
  }
}
