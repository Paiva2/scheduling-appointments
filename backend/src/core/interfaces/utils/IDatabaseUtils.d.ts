export interface IDatabaseUtils {
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollBackTransaction(): Promise<void>;
}
