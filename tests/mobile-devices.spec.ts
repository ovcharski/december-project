import { test, expect, devices } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

const devicesToTest = [
    devices['Galaxy S9+'],
    devices['iPhone 14']
];

for (const mobileDevice of devicesToTest) {
    test.use({ ...mobileDevice });

    test.describe(`Testing on ${mobileDevice.userAgent}`, () => { 
        test.beforeEach(async ({ page }) => {
            organizePage = new OrganizePage(page);
            await page.goto(baseURL);
        });

        test('Mobile Device Browser Text', async ({ page }) => {
            await expect(page.getByRole('img', { name: 'small device illustration' })).toBeVisible();
            await expect(page.getByTestId('small-device-wrapper')).toContainText('MobiPDF Online is currently unavailable across mobile browsers.');
        });

        test.afterEach(async ({ page }) => {
            const screenshotPath = `screenshots/${mobileDevice.userAgent.replace(/[^a-zA-Z0-9]/g, '_')}_${test.info().title}.png`;
            await page.screenshot({ path: screenshotPath });
            await page.close();
        });
    });
}
