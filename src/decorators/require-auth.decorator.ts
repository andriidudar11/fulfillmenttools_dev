import path from 'path';

import { FileSystemHelper } from '../helpers/file-system.helper';
import { AuthRefreshResponse, AuthResponse, Tokens } from '../dto';
import { AuthService } from '../services/auth.service';
import { HttpStatusCode } from '../enums';

const filePath = path.join(__dirname, './../../.auth');
const JwtIsExpiredMessage = 'Jwt is expired';

export function requireAuth() {
    return function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = async function (...args: any[]) {
            let idToken = '';
            let refreshToken = '';

            let originalRes = null;

            if (!FileSystemHelper.checkFile(filePath)) {
                const res: AuthResponse = await AuthService.authenticate();
                const { idToken, refreshToken } = res;

                FileSystemHelper.updateFile(filePath, {
                    idToken,
                    refreshToken,
                });

                console.log('No auth file - authenticate and update file');

                originalRes = await originalMethod.apply(this, args);

                return originalRes;
            }

            const fileValue = <Tokens>FileSystemHelper.readFile(filePath);

            if (fileValue === null) {
                console.error('File content is absent');
                return;
            }

            ({ refreshToken } = fileValue);

            originalRes = await originalMethod.apply(this, args);

            console.log('Invoke original method');

            if (
                originalRes.code === HttpStatusCode.Unauthorized &&
                originalRes.message === JwtIsExpiredMessage
            ) {
                console.log(filePath);
                const res: AuthRefreshResponse =
                    await AuthService.refreshAuthentication(refreshToken);

                const { id_token, refresh_token } = res;

                FileSystemHelper.updateFile(filePath, {
                    idToken: id_token,
                    refreshToken: refresh_token,
                });

                console.log('Jwt was expired! - update auth file');

                originalRes = await originalMethod.apply(this, args);
            }

            return originalRes;
        };
    };
}
