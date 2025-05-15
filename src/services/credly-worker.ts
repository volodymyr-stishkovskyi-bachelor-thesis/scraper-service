import { parentPort, workerData } from 'worker_threads';
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { IWorkerData } from '../interfaces/scraper.interface';
import { ICredlyResponse } from '../interfaces/credly.interface';

puppeteer.use(StealthPlugin());

async function runScraper (): Promise<ICredlyResponse[]> {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const { url } = workerData as IWorkerData;
    try {
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.click('#onetrust-accept-btn-handler');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.click('button[data-testid="button"]', {
            delay: 100,
            count: 2
        });

        const titles = await page.$$eval('.settings__skills-profile__edit-skills-profile__badge-card__main-card > div:nth-child(2)', (items) => {
            return items.map((item) => (item as HTMLElement).innerText.trim());
        })
        const issuers = await page.$$eval('.settings__skills-profile__edit-skills-profile__badge-card__main-card > div:nth-child(3)', (items) => {
            return items.map((item) => (item as HTMLElement).innerText.trim());
        })
        const issuedDates = await page.$$eval('.settings__skills-profile__edit-skills-profile__badge-card__main-card > div:nth-child(4)', (items) => {
            return items.map((item) => (item as HTMLElement).innerText.trim());
        })

        await page.close();

        return titles.map((title, index) => (
            {
                title,
                issuer: issuers[index],
                issuedDate: issuedDates[index]
            }
        ))
    } catch (error) {
        console.error('Error during scraping:', error);
        throw new Error('Scraping failed');
    } finally {
        if (browser) {
            await browser.close();
        }
    }

}

runScraper()
    .then((result) => parentPort?.postMessage(result))
    .catch((err) => parentPort?.postMessage({ error: err.message }));
