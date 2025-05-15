import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { ICredlyResponse } from '../interfaces/credly.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function scrapeCredly (): Promise<ICredlyResponse[]> {
    const url = process.env.CREDLY_PROFILE_URL;
    return new Promise((resolve, reject) => {
        const worker = new Worker(
            path.resolve(__dirname, 'credly-worker.js'),
            { workerData: { url } }
        );

        worker.on('message', (data: ICredlyResponse[]) => {
            resolve(data);
        });
        worker.on('error', (err) => reject(err));
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
