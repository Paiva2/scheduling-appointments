import { IPasswordUtils } from "../../core/interfaces/utils/IPasswordUtils";
import bcrypt from "bcryptjs";
import { Entropy, charset32 } from "entropy-string";

export class PasswordUtils implements IPasswordUtils {
  private DEFAULT_HASH_VALUE: number = 6;

  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.DEFAULT_HASH_VALUE);

    return await bcrypt.hash(password, salt);
  }

  public async verify(hashedPassword: string, rawPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }

  public generateRandomPassword(): string {
    const random = new Entropy({ bits: 60, charset: charset32, length: 7 });
    return random.string();
  }
}
