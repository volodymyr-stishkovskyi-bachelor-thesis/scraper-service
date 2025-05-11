import * as grpc from '@grpc/grpc-js';
import { ScrapeResponse } from '../interfaces/linkedin.interface.js';

export const scrapeHandler: grpc.handleUnaryCall<any, ScrapeResponse> = async (
    call: grpc.ServerUnaryCall<any, ScrapeResponse>,
    callback: grpc.sendUnaryData<ScrapeResponse>
): Promise<void> => {
    console.log('Scraping URL:', call.request.url);
    callback(null, { title: 'test', content: 'test' });
};