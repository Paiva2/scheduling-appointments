import { IDatabaseUtils } from "../../core/interfaces/utils/IDatabaseUtils";
import pool from "../persistence/database/postgres/connection";

export class DatabaseUtils implements IDatabaseUtils {
  public async beginTransaction(): Promise<void> {
    await pool.query("BEGIN");
  }

  public async commitTransaction(): Promise<void> {
    await pool.query("COMMIT");
  }

  public async rollBackTransaction(): Promise<void> {
    await pool.query("ROLLBACK");
  }
}
