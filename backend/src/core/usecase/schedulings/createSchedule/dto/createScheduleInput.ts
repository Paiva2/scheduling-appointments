import z from "zod";

export interface ICreateScheduleInput {
  id: string;
  userDoctorId: string;
  scheduleDate: Date;
  informations: string | null;
}

export const createScheduleInput = z.object({
  userDoctorId: z.string().uuid().nonempty(),
  scheduleDate: z.string().nonempty(),
  informations: z.string().nullable(),
});
