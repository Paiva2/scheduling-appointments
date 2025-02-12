export interface IPasswordUtils {
  hash(password: string): Promise<string>;
  verify(hashedPassword: string, rawPassword: string): Promise<boolean>;
  generateRandomPassword(): string;
}
