/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  phone: string;
  password: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  username: string;
  role: Role;
  user_id: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
