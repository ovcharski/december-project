import test, { expect, Page } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';
import fs from 'fs';
import path from 'path';

let organizePage: OrganizePage;

  const fileUploadTests = [
    { title: 'Upload a Single Small 36KB File', filePath: 'assets/ThinkPad_T470_Spec.pdf' },
    { title: 'Upload a Single 5MB File', filePath: 'assets/c06200926.pdf' },
    { title: 'Upload a Single Big 13MB File', filePath: 'assets/EMEA_Why_We_Watch_2.0_-_2024_Digital_Report.pdf' },
    { title: 'Upload a Single Cyrillic File Name', filePath: 'assets/Програма Полумаратон София.docx.pdf' },
    { title: 'Upload a Single ☺️ Emoji File Name', filePath: 'assets/☺️.pdf' },
    { title: 'Upload a Single Arabic File Name', filePath: 'assets/عبد الملك.pdf' },
    { title: 'Upload a Single Japanese File Name', filePath: 'assets/日本語のファイル.pdf' },
    { title: 'Upload a Single Chinese File Name', filePath: 'assets/中文文件.pdf' },
    { title: 'Upload a Single Special Characters File Name', filePath: 'assets/!@#$%^&().pdf' },
    { title: 'Upload a Single Long File Name', filePath: 'assets/this_is_a_very_long_file_name_to_test_the_upload_functionality_of_the_application.pdf' }
  ];

  for (const { title, filePath } of fileUploadTests) {
    test(title, async ({ page }) => {
      await organizePage.uploadFile(filePath);
    });
  }

// Validate files exist before running tests
test.beforeAll(async () => {
  for (const { title, filePath } of fileUploadTests) {
      const absolutePath = path.resolve(process.cwd(), filePath);
      try {
          await fs.promises.access(absolutePath);
      } catch (error) {
          throw new Error(`File not found for test "${title}": ${filePath}`);
      }
  }
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIcon();
});

  test.afterEach(async ({ page }) => {
    try {
      await organizePage.ribbonIsSelectAllVisible();
  } catch (error) {
      console.error(`Test ${test.info().title} failed:`, error);
      throw error;
  }
    await page.screenshot({ path: `screenshots/${test.info().title}.png`, fullPage: true });
    await page.close();
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);

    if (test.info().status !== test.info().expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });