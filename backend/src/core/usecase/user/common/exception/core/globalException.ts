export class GlobalException extends Error {
  constructor(message: string, status: number) {
    const cause = { status: status || 500 };

    super(message, { cause });

    this.message = message;
  }
}
