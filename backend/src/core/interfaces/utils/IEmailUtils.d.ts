export interface IEmailUtils {
  sendSimpleMail(to: string, title: string, message: string): void;
}
