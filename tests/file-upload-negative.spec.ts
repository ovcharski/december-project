import test, { expect, Page } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';
import fs from 'fs';

let organizePage: OrganizePage;

test('Upload Invalid PDF File', async ({ page }) => {

  // Upload invalid file
  await organizePage.uploadFile('assets/fake.pdf');

  // Verify error state
  await expect(organizePage.alertImage()).toBeVisible();
  await expect(organizePage.unsupportedFileFormatText()).toBeVisible();
  await expect(organizePage.confirmButton()).toBeVisible();
  await expect(organizePage.windowsButton()).toBeVisible();
  await organizePage.alertConfirmButtonClick();
  await expect(organizePage.alertImage()).toBeHidden();
});

test('File Upload - Expect Error on Multiple PDF Files Upload', async ({ page }) => {

  // Attempt to upload two files and expect an error
  let errorCaught = false;
  try {
    await organizePage.uploadMultipleFiles([
      'assets/ThinkPad_T470_Spec.PDF',
      'assets/c06200926.pdf'
    ]);
  } catch (error) {
    errorCaught = true;
    expect(error.message).toContain('Non-multiple file input can only accept single file');
  }

  // Assert that an error was caught
  expect(errorCaught).toBe(true);

  await page.screenshot({ path: `screenshots/${test.info().title}.png` });
});

test('Upload Invalid PDF File and Download Windows app', async ({ page }) => {

  // Upload invalid file
  await organizePage.uploadFile('assets/fake.pdf');
  
  // Verify error state
  await expect(organizePage.alertImage()).toBeVisible();
  await expect(organizePage.unsupportedFileFormatText()).toBeVisible();
  await expect(organizePage.confirmButton()).toBeVisible();
  await expect(organizePage.windowsButton()).toBeVisible();

  // Download file
  const waitForDownloadEvent = page.waitForEvent('download');
  await organizePage.alertWindowsButtonClick();
  const download = await waitForDownloadEvent;
  const filePath = 'downloads/organize-windows-app.exe';
  await download.saveAs(filePath);

  // Assert download
  await expect(fs.existsSync(filePath)).toBeTruthy();
  const fileStats = fs.statSync(filePath);
  await expect(fileStats.size).toBeGreaterThan(0);
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIconClick();
});

test.afterEach(async ({ page }) => {
  await page.close();
});