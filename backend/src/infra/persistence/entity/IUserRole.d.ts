export interface IUserRole {
  usl_user_id: string;
  usl_role_id: string;
  usl_created_at: Date;
  rl_id: string | null;
  rl_name: string | null;
}
