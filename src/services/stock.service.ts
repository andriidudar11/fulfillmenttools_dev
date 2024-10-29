import { requireAuth } from '../decorators';
import { Stock } from '../dto';
import { HttpService } from './http.service';

export class StockService {
    @requireAuth()
    public static async createStock(
        stock: Stock,
    ) {
        const url = HttpService.buildUrl(`api/stocks`);

        const res = await HttpService.post(url, JSON.stringify(stock));

        return res.json();
    }

    @requireAuth()
    public static async getStocks(facilityRef: string) {
        const url = HttpService.buildUrl(`api/stocks`);

        const res = await HttpService.get(
            url,
            JSON.stringify({
                facilityRef,
            })
        );

        return res.json();
    }

    public static getDefaultEntity(facilityRef: string, tenantArticleId: string, value: number): Stock {
        return {
            facilityRef,
            tenantArticleId,
            value,
            receiptDate: '2024-09-27T18:18:52.710Z',
            availableUntil: '2025-10-27T18:18:52.710Z',
        }
    }
}
