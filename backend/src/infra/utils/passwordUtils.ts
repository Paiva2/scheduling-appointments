import { IPasswordUtils } from "../../core/interfaces/utils/IPasswordUtils";
import bcrypt from "bcryptjs";

export class PasswordUtils implements IPasswordUtils {
  private DEFAULT_HASH_VALUE: number = 6;

  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.DEFAULT_HASH_VALUE);

    return await bcrypt.hash(password, salt);
  }

  public async verify(hashedPassword: string, rawPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}
