import { expect, Page } from '@playwright/test';

export class OrganizePage {
readonly page: Page;

constructor(page: Page) {
    this.page = page;
}

// Cookie popup:

async cookieConsentYes() {
    await this.page.getByLabel('Consent', { exact: true }).click();
}

async bannerCloseIcon() {
    await this.page.getByTestId('closeIcon').click();
}

async chooseFileButton() {
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

async ribbonUndo() {
    await this.page.getByTestId('toolbarWrapper').locator('div').filter({ hasText: 'Undo' }).nth(1).click();
}

async ribbonRedo() {
    await this.page.getByTestId('toolbarWrapper').locator('div').filter({ hasText: 'Redo' }).nth(1).click();
}

async ribbonRotateLeft() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'RotateLeft' }).first().click();
}

async ribbonRotateRight() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'RotateRight' }).first().click();
}

async ribbonDeletePage() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'DeletePage' }).first().click();
}

async ribbonDuplicatePage() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'DuplicatePage' }).first().click();
}

async ribbonPreviewPage() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'PreviewPage' }).first().click();
}

async ribbonSelectAll() {
    await this.page.getByTestId('specializedTools').locator('div').filter({ hasText: 'SelectAll' }).first().click();
}

async ribbonIsSelectAllVisible(): Promise<boolean> {
    const selectAllIcon = this.page.getByRole('img', { name: 'selectAllicon' });
    await expect(selectAllIcon).toBeVisible();
    return true;
}

// After file edit

async finishButton() {
    await this.page.getByTestId('finish').click();
}

async startOverButton() {
    await this.page.getByTestId('closeButton').click();
}

// Invalid file format alert:

async alertConfirmButton() {
    await this.page.getByTestId('confirmBtn').click();
}

async alertUnsupportedText() {
    await this.page.getByText('Unsupported file format').click();
}

async alertWindowsButton() {
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