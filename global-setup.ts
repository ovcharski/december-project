import { Browser, chromium, expect, Page } from "@playwright/test";

export const baseURL = 'https://test.mobisystems.com/mobipdf/online/organize'; 

async function globalSetup() {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://test.mobisystems.com/mobipdf/online/organize");
    await page.getByLabel('Consent', { exact: true }).click();
    await expect(page.getByTestId('open')).toBeVisible();
    await expect(page.getByRole('img', { name: 'upload a file' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms and conditions' })).toBeVisible();

    // Save the state of the webpage

    await page.context().storageState({ path: 'state.json' });
    await browser.close();

}

export default globalSetup;