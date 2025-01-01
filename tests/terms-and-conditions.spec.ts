import { test, expect } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

test('Test Terms and Conditions', async ({ page }) => {

  const pageTermsPromise = page.waitForEvent('popup', { timeout: 10000 });

  // Listening for a popup event, it's triggered when a new page or popup is created

  await page.getByRole('link', { name: 'Terms and conditions' }).click();
  const pageTerms = await pageTermsPromise;
  await expect(pageTerms.locator('h1')).toContainText('Terms of Use');
  await expect(pageTerms.getByRole('link', { name: 'Learn More' })).toBeVisible();
  await expect(pageTerms.getByRole('heading', { name: 'Terms of Use' })).toBeVisible();
  await expect(pageTerms.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIconClick();
});

test.afterEach(async ({ page, context }) => {
  await context.close(); // This closes all pages/tabs
});