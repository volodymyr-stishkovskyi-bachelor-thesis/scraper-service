import * as grpc from '@grpc/grpc-js';
import * as dotenv from 'dotenv';
import { scrapeHandler } from './handlers/linkedin-scraper.handler.js';
import { proto } from './proto.js';
import { leetcodeHandler } from './handlers/leetcode.handler.js';

dotenv.config();

function main (): void {
  const host: string = process.env.HOST || 'localhost';
  const port: string = process.env.PORT || '50051';
  const server: grpc.Server = new grpc.Server();

  server.addService(proto.ScraperService.service, { Scrape: scrapeHandler });
  server.addService(proto.LeetCodeService.service, { GetStats: leetcodeHandler });

  const bindAddress: string = `${host}:${port}`;
  server.bindAsync(
    bindAddress,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      console.log(`Bind address: ${bindAddress}`);
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server running at http://${host}:${port}`);
    }
  );
}

main();