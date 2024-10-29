import { requireAuth } from '../decorators';
import { HttpService } from './http.service';

export class HandoverService {
    @requireAuth()
    public static async handover(handoverJobId: string, body: any) { // TODO fix any
        const url = HttpService.buildUrl(`api/handoverjobs/${handoverJobId}`);

        const res = await HttpService.patch(url, JSON.stringify(body));

        return res.json();
    }

    public static getDefaultHandoverEntity(version: number) {
        return {
            actions: [
                {
                    action: 'ModifyHandoverjob',
                    status: 'HANDED_OVER',
                },
            ],
            version,
        };
    }
}
