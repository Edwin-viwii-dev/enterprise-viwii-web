export interface User {
  [prop: string]: any;

  id?: number | string | null;
  email?: string;
  user_metadata?: {
    username?: string;
    avatar?: string;
    roles?: any[];
    permissions?: any[];
  };
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  expires_at?: number;
  refresh_token?: string;
}
