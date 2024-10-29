import { requireAuth } from '../decorators';
import { EventBody } from '../dto';
import { HttpService } from './http.service';

export class PackService {
    @requireAuth()
    public static async pack(
        packJobId: string,
        body: any, // TODO fix any
    ) {
        const url = HttpService.buildUrl(`api/packjobs/${packJobId}`);

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async closePackJob(packJobId: string, body: any) { // TODO fix any
        const url = HttpService.buildUrl(`api/packjobs/${packJobId}`);

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    public static getDefaultPackEntity(itemId: string, amount: number, version: number) {
        return {
            version,
            actions: [
                {
                    action: 'ModifyPackLineItem',
                    id: itemId,
                    packed: amount,
                },
            ],
        };
    }

    public static getDefaultClosePackEntity(version: number) {
        return {
            version,
            actions: [
                {
                    action: 'ModifyPackJob',
                    status: 'CLOSED',
                },
            ],
        };
    }
}
