import { requireAuth } from '../decorators';
import { EventBody } from '../dto';
import { HttpService } from './http.service';

export class PickService {
    @requireAuth()
    public static async pick(
        pickJobId: string,
        body: EventBody
    ) {
        const url = HttpService.buildUrl(`api/pickjobs/${pickJobId}`);

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async closePickJob(pickJobId: string, body: EventBody) {
        const url = HttpService.buildUrl(`api/pickjobs/${pickJobId}`);

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    public static getDefaultPickEntity(stockId: string, itemId: string, version: number): EventBody {
        return {
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
    }

    public static getDefaultClosePickEntity(version: number): EventBody {
        return {
            version,
            actions: [
                {
                    action: 'ModifyPickJob',
                    status: 'CLOSED',
                },
            ],
        };
    }
}
