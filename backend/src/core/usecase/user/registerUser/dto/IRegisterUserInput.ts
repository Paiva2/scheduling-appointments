import z from "zod";
import { EnumRole } from "../../../../enum";

export interface IRegisterUserInput {
  email: string;
  name: string;
  password: string;
  role: EnumRole;
  address: IRegisterUserInputAddress;
}

export interface IRegisterUserInputAddress {
  street: string;
  neighbourhood: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  complement: string | null;
}

export const registerUserInput = z.object({
  email: z.string().nonempty(),
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  role: z.enum(["USER", "DOCTOR"]),
  address: z.object({
    street: z.string().nonempty(),
    neighbourhood: z.string().nonempty(),
    houseNumber: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    country: z.string().nonempty(),
    zipCode: z.string().nonempty(),
    complement: z.string().nullable(),
  }),
});
