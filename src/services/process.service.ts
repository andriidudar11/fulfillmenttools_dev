import { requireAuth } from '../decorators';
import { HttpService } from './http.service';

export class ProcessService {
    @requireAuth()
    public static async getProcessInfo(processId: string) {
        const url = HttpService.buildUrl(`api/processes/${processId}`);

        const res = await HttpService.get(url);

        return res.json();
    }
}
