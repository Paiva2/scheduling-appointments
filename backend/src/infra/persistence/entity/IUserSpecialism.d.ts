export interface IUserSpecialism {
  usp_user_id: string;
  usp_spe_id: string;
  usp_created_at: string;
  usp_specialism: {
    id: string;
    name: string;
  };
}
