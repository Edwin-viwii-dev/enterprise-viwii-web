export interface User {
  [prop: string]: any;

  id?: number | string | null;
  email?: string;
  user_metadata?: {
    username?: string;
    storeId?: string;
    documentType?: string;
    documentNumber?: string;
    city?: string;
    address?: string;
    cellphone?: string;
    role?: any[];
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
