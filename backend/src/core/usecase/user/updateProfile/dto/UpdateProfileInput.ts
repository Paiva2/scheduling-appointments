import z from "zod";

export interface IUpdateProfileInput {
  name: string;
  email: string;
  password: string | null;
  address: {
    street: string;
    neighbourhood: string;
    state: string;
    city: string;
    country: string;
    zipCode: string;
    houseNumber: string;
    complement: string | null;
  };
  specialisms: string[];
}

export const updateProfileInput = z.object({
  email: z.string().nonempty(),
  name: z.string().nonempty(),
  password: z.string().optional().nullable(),
  specialisms: z.array(z.string().uuid()),
  address: z.object({
    street: z.string().nonempty(),
    neighbourhood: z.string().nonempty(),
    houseNumber: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    country: z.string().nonempty(),
    zipCode: z.string().nonempty(),
    complement: z.string().nullable().optional(),
  }),
});
