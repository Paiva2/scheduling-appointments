import { PoolClient, Pool } from "pg";
import dbInit from "./dbInit";

const pool = new Pool({
  user: "postgres",
  port: 5432,
  database: "impacta_project_db",
  password: "postgres",
  max: 20,
});

export async function pingDb() {
  let connection: PoolClient | null = null;

  try {
    connection = await pool.connect();

    const {
      rows: [ping],
    } = await connection.query("SELECT CURRENT_TIME;");

    if (ping != null) {
      console.log("Postgres connected on port: " + 5432);

      await dbInit();
    }
  } catch (e) {
    console.log("Error while connecting to Postgres...", e);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export default pool;
