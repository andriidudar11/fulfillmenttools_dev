import { requireAuth } from '../decorators';
import { HttpService } from './http.service';

export class PickService {
    @requireAuth()
    public static async pick(
        pickJobId: string,
        stockId: string,
        itemId: string,
        version: number
    ) {
        const url = HttpService.buildUrl(`api/pickjobs/${pickJobId}`);

        const body = {
            version,
            actions: [
                {
                    action: 'ModifyPickJob',
                    status: 'IN_PROGRESS',
                },
                {
                    action: 'ModifyPickLineItem',
                    id: itemId,
                    picked: 1,
                    status: 'CLOSED',
                    partialStockLocations: [
                        {
                            tenantPartialStockId: stockId,
                            picked: 1,
                        },
                    ],
                },
            ],
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async closePickJob(pickJobId: string, version: number) {
        const url = HttpService.buildUrl(`api/pickjobs/${pickJobId}`);

        const body = {
            version,
            actions: [
                {
                    action: 'ModifyPickJob',
                    status: 'CLOSED',
                },
            ],
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }
}
