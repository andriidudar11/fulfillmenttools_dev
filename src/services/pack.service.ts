import { requireAuth } from '../decorators';
import { HttpService } from './http.service';

export class PackService {
    @requireAuth()
    public static async pack(
        packJobId: string,
        stockId: string,
        itemId: string,
        amount: number,
        version: number
    ) {
        const url = HttpService.buildUrl(`api/packjobs/${packJobId}`);

        const body = {
            version,
            actions: [
                {
                    action: 'ModifyPackLineItem',
                    id: itemId,
                    packed: amount,
                },
            ],
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async closePackJob(packJobId: string, version: number) {
        const url = HttpService.buildUrl(`api/packjobs/${packJobId}`);

        const body = {
            version,
            actions: [
                {
                    action: 'ModifyPackJob',
                    status: 'CLOSED',
                },
            ],
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }
}
