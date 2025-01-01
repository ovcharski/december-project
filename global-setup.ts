import { Browser, chromium, expect, Page } from "@playwright/test";

export const baseURL = 'https://test.mobisystems.com/mobipdf/online/organize';

async function globalSetup() {
    const browser: Browser = await chromium.launch({ 
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ]
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        // Remove invalid navigationTimeout
    });

    // Set timeouts at Page level instead
    const page: Page = await context.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(30000);

    try {
        await page.goto(baseURL, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        try {
            const consentButton = page.getByLabel('Consent', { exact: true });
            await consentButton.waitFor({ timeout: 10000 });
            if (await consentButton.isVisible()) {
                await consentButton.click();
            }
        } catch (error) {
            console.log('Consent dialog not found or not clickable, continuing...');
        }

        await Promise.all([
            expect(page.getByTestId('open')).toBeVisible({ timeout: 30000 }),
            expect(page.getByRole('img', { name: 'upload a file' })).toBeVisible({ timeout: 30000 }),
            expect(page.getByRole('link', { name: 'Terms and conditions' })).toBeVisible({ timeout: 30000 })
        ]);

        await page.context().storageState({ path: 'state.json' });

    } catch (error) {
        console.error('Setup failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

export default globalSetup;