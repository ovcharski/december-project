import { expect, Page } from '@playwright/test';

export class OrganizePage {
readonly page: Page;

constructor(page: Page) {
    this.page = page;
}

// Cookie popup:

async cookieConsentYesClick() {
    await this.page.getByLabel('Consent', { exact: true }).click();
}

async bannerCloseIconClick() {
    await this.page.getByTestId('closeIcon').click();
}

async chooseFileButtonClick() {
    await this.page.getByTestId('open').click();
}

// Method to upload a single file

async uploadFile(filePath: string) {
    await this.page.setInputFiles('input[type="file"]', filePath);
}

// Method to upload multiple files

async uploadMultipleFiles(filePaths: string[]) {
    await this.page.setInputFiles('input[type="file"]', filePaths);
}

// Ribbon buttons:

async ribbonUndoClick() {
    await this.page.getByTestId('toolbarWrapper').locator('div').filter({ hasText: 'Undo' }).nth(1).click();
}

async ribbonRedoClick() {
    await this.page.getByTestId('toolbarWrapper').locator('div').filter({ hasText: 'Redo' }).nth(1).click();
}

async ribbonRotateLeftClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'RotateLeft' }).first().click();
}

async ribbonRotateRightClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'RotateRight' }).first().click();
}

async ribbonDeletePageClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'DeletePage' }).first().click();
}

async ribbonDuplicatePageClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'DuplicatePage' }).first().click();
}

async ribbonPreviewPageClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'PreviewPage' }).first().click();
}

async ribbonSelectAllClick() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'SelectAll' }).first().click();
}

async ribbonIsSelectAllVisible(): Promise<boolean> {
    const selectAllIcon = this.page.getByRole('img', { name: 'selectAllicon' });
    await expect(selectAllIcon).toBeVisible();
    return true;
}

// Mini icons for editing:

async miniIconsThumbnailClick() {
    await this.page.locator('div').filter({ hasText: /^Rotate page leftRotate page rightDuplicate pagePreview pageDelete page1$/ }).locator('canvas').click({
      position: {
        x: 93,
        y: 80
      }
    });
  }

async miniRotateLeftClick() {
    await this.page.getByRole('img', { name: 'rotate_lefticon' }).click();
}
// alternative await page.locator('div:nth-child(2) > div > .p-1').first().click();


async miniRotateRightClick() {
    await this.page.getByRole('img', { name: 'rotate_righticon' }).click();
}
// alternative await page.locator('div:nth-child(3) > div > .p-1').first().click();

async miniDuplicatePageClick() {
    await this.page.getByRole('img', { name: 'duplicate_pageicon' }).click();
}
// alternative await page.locator('div:nth-child(4) > div > .p-1').first().click();

async miniDeletePageClick() {
    await this.page.getByRole('img', { name: 'delete_pageicon' }).click();
}
// alternative await page.locator('div:nth-child(5) > div > .p-1').first().click();

async miniPreviewPageClick() {
    await this.page.getByRole('img', { name: 'preview_pageicon' }).click();
}
// alternative await page.locator('div:nth-child(6) > div > .p-1').first().click();

async miniCloseIconClick() {
    await this.page.getByAltText('close icon').click();
}

fff

// Checkbox:    

async checkboxCheck() {
    await this.page.getByRole('checkbox').check();
}
// alternative await page.locator('.p-1').first().click();

async checkboxUncheck() {
    await this.page.getByRole('checkbox').uncheck();
}

// Preview page:

async previewCloseIconClick() {
    await this.page.getByAltText('close icon').click();
}

async documentPageCanvasToBeVisible() {
    await expect(this.page.getByTestId('documentPage').locator('canvas')).toBeVisible();
}

// After file edit

async finishButtonClick() {
    await this.page.getByTestId('finish').click();
}

async startOverButtonClick() {
    await this.page.getByTestId('closeButton').click();
}

// Invalid file format alert:

async alertConfirmButtonClick() {
    await this.page.getByTestId('confirmBtn').click();
}

async alertUnsupportedTextClick() {
    await this.page.getByText('Unsupported file format').click();
}

async alertWindowsButtonClick() {
    await this.page.getByTestId('windowsButton').click();
}

// Methods to return locators for assertions
layoutWrapper() {
    return this.page.getByTestId('layoutWrapper');
}

dropzone() {
    return this.page.getByTestId('dropzone');
}

alertImage() {
    return this.page.getByRole('img', { name: 'alert image' });
}

unsupportedFileFormatText() {
    return this.page.getByText('Unsupported file format');
}

confirmButton() {
    return this.page.getByTestId('confirmBtn');
}

windowsButton() {
    return this.page.getByTestId('windowsButton');
}

// Language toggle:

// Locators
private get languageToggle() {
    return this.page.getByTestId('languageToggle');
}

private get chooseFileText() {
    return this.page.getByTestId('open');
}

// Methods
async selectLanguage(country: string) {
    await this.languageToggle.click();
    await this.page.getByText(country, { exact: true }).click();
}

async verifyChooseFileText(expectedText: string) {
    await expect(this.chooseFileText).toContainText(expectedText);
}

}