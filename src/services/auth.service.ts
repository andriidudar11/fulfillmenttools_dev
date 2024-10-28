import { AuthRequestBody, AuthResponse } from '../dto';
import { AuthRefreshResponse } from '../dto/auth-refresh-response.dto';
import { HttpService } from './http.service';
import environment from './../environment';

export class AuthService {
    public static async authenticate(): Promise<AuthResponse> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.authKey}`;
        const authRequestBody: AuthRequestBody = {
            email: environment.login,
            password: environment.password,
            returnSecureToken: true,
        };

        console.log('authenticate was invoked');

        const res: Response = await HttpService.post(
            url,
            JSON.stringify(authRequestBody),
            false
        );

        return await (<Promise<AuthResponse>>res.json());
    }

    public static async refreshAuthentication(
        refreshToken: string
    ): Promise<AuthRefreshResponse> {
        const url = `https://securetoken.googleapis.com/v1/token?grant_type=refresh_token&refresh_token=${refreshToken}&key=${environment.authKey}`;

        console.log('refreshAuthentication was invoked');

        const res: Response = await HttpService.post(url, '', false);
        return <Promise<AuthRefreshResponse>>res.json();
    }
}
