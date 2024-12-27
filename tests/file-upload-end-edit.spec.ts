import test, { expect, Page } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

test('Upload a File and Dublicate the pages', async ({ page }) => {
  await organizePage.uploadFile('assets/file-to-edit.pdf');

  // Assert that the file was uploaded and the thumbnails are visible via Text
  await expect(organizePage.layoutWrapper()).toContainText('1');
  await expect(organizePage.layoutWrapper()).toContainText('2');

  // Assert that the file was uploaded and the thumbnails are visible via Aria Snapshot
  await expect(organizePage.layoutWrapper()).toMatchAriaSnapshot(`- text: 1 2`);
  await organizePage.ribbonSelectAll();
  await organizePage.ribbonDuplicatePage();
  await expect(organizePage.layoutWrapper()).toMatchAriaSnapshot(`- text: 1 2 3 4`);
  await organizePage.finishButton();
  await organizePage.startOverButton();
  await expect(organizePage.dropzone()).toBeVisible();

});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIcon();
});

test.afterEach(async ({ page }) => {
  await page.close();
});