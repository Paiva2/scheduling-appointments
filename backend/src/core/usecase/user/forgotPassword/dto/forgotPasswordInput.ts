import z from "zod";

export interface IForgotPasswordInput {
  email: string;
}

export const forgotPasswordInput = z.object({
  email: z.string().nonempty(),
});
