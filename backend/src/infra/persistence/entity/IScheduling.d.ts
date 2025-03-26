export interface IScheduling {
  sch_id: string;
  sch_user_id: string;
  user: {
    usr_id: string;
    usr_name: string;
    usr_email: string;
    usr_address: {
      id: string;
      city: string;
      state: string;
      street: string;
      country: string;
      zipcode: string;
      complement: string | null;
      house_number: string;
      neighbourhood: string;
    };
  } | null;
  sch_user_doctor_id: string;
  user_doctor: {
    udc_id: string;
    udc_name: string;
    udc_email: string;
    udc_address: {
      id: string;
      city: string;
      state: string;
      street: string;
      country: string;
      zipcode: string;
      complement: string | null;
      house_number: string;
      neighbourhood: string;
    };
    udc_specialism_list: Array<{
      id: string;
      name: string;
    }>;
  } | null;
  sch_informations: string | null;
  sch_active: boolean;
  sch_scheduled_at: Date;
  sch_finished_at: Date | null;
  sch_created_at: Date;
  sch_updated_at: Date;
}
