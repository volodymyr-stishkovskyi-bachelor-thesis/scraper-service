import * as grpc from '@grpc/grpc-js';
import { ScrapeResponse } from '../interfaces/scraper.interface.js';
import { scrapeCredly } from '../services/credly-scraper.js';
import { getLeetCodeStats } from '../services/leet-code.service.js';

export const scrapeHandler: grpc.handleUnaryCall<any, ScrapeResponse> = async (
    _: grpc.ServerUnaryCall<any, ScrapeResponse>,
    callback: grpc.sendUnaryData<ScrapeResponse>
): Promise<void> => {
    try {
        const [credly, leetcode] = await Promise.all([scrapeCredly(), getLeetCodeStats()]);
        console.log({
            credly,
            leetcode,
        })
        callback(null, { credly, leetcode });
    } catch (err: any) {
        console.error('Scraping failed:', err);
        return callback(err, null as any);
    }
};