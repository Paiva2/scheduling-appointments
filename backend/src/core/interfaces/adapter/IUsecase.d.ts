export interface IUsecase {
  execute(input: unknown): Promise<unkown>;
}
