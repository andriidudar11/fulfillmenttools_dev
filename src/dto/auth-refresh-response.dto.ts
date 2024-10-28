import { Token } from '../types';

export interface AuthRefreshResponse {
    access_token: string;
    expires_in: string;
    token_type: Token;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
}
