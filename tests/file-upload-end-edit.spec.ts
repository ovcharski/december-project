import test, { expect, Page } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

test('Upload a File and Dublicate the pages', async ({ page }) => {

  // Assert that the file was uploaded and the thumbnails are visible via Text
  await expect(organizePage.layoutWrapper()).toContainText('1');
  await expect(organizePage.layoutWrapper()).toContainText('2');

  // Assert that the file was uploaded and the thumbnails are visible via Aria Snapshot
  await expect(organizePage.layoutWrapper()).toMatchAriaSnapshot(`- text: 1 2`);
  await organizePage.ribbonSelectAllClick();
  await organizePage.ribbonDuplicatePageClick();
  await expect(organizePage.layoutWrapper()).toMatchAriaSnapshot(`- text: 1 2 3 4`);
  await organizePage.finishButtonClick();
  await organizePage.startOverButtonClick();
  await expect(organizePage.dropzone()).toBeVisible();
});

test('Upload a File and use the mini icons to edit', async ({ page }) => {
  test.slow();

// By default the mini icons are not visible. On click on thumbnail the mini icons will become visible
  await organizePage.miniIconsThumbnailClick();
  await organizePage.checkboxCheck();
  // await organizePage.miniRotateLeftClick();
  // await organizePage.miniRotateRightClick();
  await organizePage.miniDuplicatePageClick();
  await expect(organizePage.layoutWrapper()).toMatchAriaSnapshot(`- text: 1 2 3`);
  await organizePage.miniDeletePageClick();
  await organizePage.miniPreviewPageClick();

// expect the preview to be visible
  await organizePage.documentPageCanvasToBeVisible();

  await organizePage.previewCloseIconClick();
  await organizePage.finishButtonClick();
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIconClick();
  await organizePage.uploadFile('assets/file-to-edit.pdf');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

