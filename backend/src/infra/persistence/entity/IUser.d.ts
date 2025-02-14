export interface IUser {
  usr_id: string;
  usr_name: string;
  usr_email: string;
  usr_password: string;
  usr_created_at: Date;
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
  usr_user_roles_list: Array<{
    user_id: string;
    role_id: string;
    url_role: {
      id: string;
      name: string;
    };
  }>;
  usr_specialism_list: Array<{
    id: string;
    name: string;
  }>;
}
