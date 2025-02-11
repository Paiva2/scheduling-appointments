import z from "zod";

export interface IAuthUserInput {
  email: string;
  password: string;
}

export const authUserInput = z.object({
  email: z.string().nonempty(),
  password: z.string().min(6).nonempty(),
});
