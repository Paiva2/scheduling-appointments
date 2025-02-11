export interface ITokenConfig {
  generate(payload: { id: string; email: string }): string;
  verify(token: I): unknown;
}
