import * as grpc from '@grpc/grpc-js';
import { ILeetCodeStats } from '../interfaces/leetcode-response.interface.js';
import { getLeetCodeStats } from '../services/leet-code.service.js';

export const leetcodeHandler: grpc.handleUnaryCall<any, ILeetCodeStats> = async (
    call: grpc.ServerUnaryCall<any, ILeetCodeStats>,
    callback: grpc.sendUnaryData<ILeetCodeStats>
): Promise<void> => {
    console.log('Starting LeetCode stats scraping');
    const stats = await getLeetCodeStats();
    callback(null, stats);
};