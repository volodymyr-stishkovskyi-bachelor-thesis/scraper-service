import { ICredlyResponse } from "./credly.interface";
import { ILeetCodeStats } from "./leetcode-response.interface";

export interface ScrapeRequest {
    url: string;
}

export interface ScrapeResponse {
    credly: ICredlyResponse[];
    leetcode: ILeetCodeStats;
}

export interface IWorkerData {
    url: string;
}