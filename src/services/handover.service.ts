import { requireAuth } from '../decorators';
import { HttpService } from './http.service';

export class HandoverService {
    @requireAuth()
    public static async handover(handoverJobId: string, version: number) {
        const url = HttpService.buildUrl(`api/handoverjobs/${handoverJobId}`);

        const body = {
            actions: [
                {
                    action: 'ModifyHandoverjob',
                    status: 'HANDED_OVER',
                },
            ],
            version,
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }
}
