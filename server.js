const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
require('dotenv').config();
// const puppeteer = require('puppeteer');
const path = require('path');

const PROTO_PATH = path.join(__dirname, './scraper.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDefinition).scraper;

/**
 * @param {Object} req
 * @param {Function} callback
 */
function scrapeHandler(req, callback) {
  console.log('Scraping URL:', req.request.url);
  callback(null, { title: 'test', content: 'test' });
}

/**
 * Main
 */
function main() {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || '50051';
  const server = new grpc.Server();
  server.addService(proto.ScraperService.service, { Scrape: scrapeHandler });
  const bindAddress = `${host}:${port}`;
  server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
    console.log(`Bind address: ${bindAddress}`);
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://${host}:${port}`);
  });
}

main();