import path from 'path';
import { FileSystemHelper } from '../helpers/file-system.helper';
import { Tokens } from '../dto';

const filePath = path.join(__dirname, './../../.auth');

export class HttpService {
    public static post(
        url: string,
        body: string,
        appendAuthHeaders: boolean = true
    ): Promise<Response> {
        let headers = {
            'Content-Type': 'application/json',
        };

        if (appendAuthHeaders) {
            headers = {
                ...headers,
                ...HttpService.createAuthHeaders(),
            };
        }

        return fetch(url, {
            method: 'POST',
            headers,
            body,
        });
    }

    public static get(url: string, params?: string): Promise<Response> {
        return fetch(
            url +
                (params !== undefined ? '?' + new URLSearchParams(params) : ''),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...HttpService.createAuthHeaders(),
                },
            }
        );
    }

    public static put(url: string, body: string): Promise<Response> {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.createAuthHeaders(),
            },
            body,
        });
    }

    public static patch(url: string, body: string): Promise<Response> {
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.createAuthHeaders(),
            },
            body,
        });
    }

    public static delete(url: string): Promise<Response> {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.createAuthHeaders(),
            },
        });
    }

    public static createAuthHeaders(): object {
        const jwt = HttpService.getJWT();
        return jwt === ''
            ? {}
            : {
                  Authorization: 'Bearer ' + HttpService.getJWT(),
              };
    }

    public static buildUrl(path: string): string {
        if (path[0] === '/') {
            throw new Error('path should not start with "/"');
        }
        return `${process.env.API_URL}/${path}`;
    }

    private static getJWT(): string {
        if (FileSystemHelper.checkFile(filePath)) {
            const fileValue = <Tokens>FileSystemHelper.readFile(filePath);
            const JWT = fileValue?.idToken;

            if (!JWT) {
                console.log(`No JWT is present: `, JWT);

                return '';
            }

            return fileValue.idToken;
        }

        return '';
    }
}
