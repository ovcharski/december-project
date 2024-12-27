import test, { expect, Page } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

test('Upload a Single Small 36KB File', async ({ page }) => {
  await organizePage.uploadFile('assets/ThinkPad_T470_Spec.pdf');
});

test('Upload a Single 5MB File', async ({ page }) => {
  await organizePage.uploadFile('assets/c06200926.pdf');
});

test('Upload a Single Big 13MB File', async ({ page }) => {
  await organizePage.uploadFile('assets/EMEA_Why_We_Watch_2.0_-_2024_Digital_Report.pdf');
});

test('Upload a Single Cyrillic File Name', async ({ page }) => {
  await organizePage.uploadFile('assets/Програма Полумаратон София.docx.pdf');
});

test('Upload a Single ☺️ Emoji File Name', async ({ page }) => {
  await organizePage.uploadFile('assets/☺️.pdf');
});

test('Upload a Single Arabic File Name', async ({ page }) => {
  await organizePage.uploadFile('assets/عبد الملك.pdf');
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIcon();
});

test.afterEach(async ({ page }) => {
  await organizePage.ribbonIsSelectAllVisible();
  await page.screenshot({ path: `screenshots/${test.info().title}.png` });
  await page.close();
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);
  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});