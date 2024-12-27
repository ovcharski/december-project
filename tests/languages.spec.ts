import { test, expect } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

test('Change language OG', async ({ page }) => {
  await expect(page.getByTestId('open')).toContainText('Choose File');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Argentina').click();
  await expect(page.getByTestId('open')).toContainText('Elegir archivo');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Brasil').click();
  await expect(page.getByTestId('open')).toContainText('Escolher arquivo');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Canada (Français)').click();
  await expect(page.getByTestId('open')).toContainText('Choisissez un fichier');
  await page.getByTestId('languageToggle').click();

  await page.getByText('ישראל').click();
  await expect(page.getByTestId('open')).toContainText('בחירת קובץ');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Nederland', { exact: true }).click();
  await expect(page.getByTestId('open')).toContainText('Bestand kiezen');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Deutschland').click();
  await expect(page.getByTestId('open')).toContainText('Datei auswählen');
  await page.getByTestId('languageToggle').click();

  await page.getByText('Italia').click();
  await expect(page.getByTestId('open')).toContainText('Scegli file');
  await page.getByTestId('languageToggle').click();

  await page.getByText('България').click();
  await expect(page.getByTestId('open')).toContainText('Изберете файл');
  await page.getByTestId('languageToggle').click();

  await page.getByText('日本語').click();
  await expect(page.getByTestId('open')).toContainText('ファイルを選択');
});

test('Change language Refactored', async ({ page }) => {

  const languages = [
      { country: 'Argentina', text: 'Elegir archivo' },
      { country: 'Brasil', text: 'Escolher arquivo' },
      { country: 'Canada (Français)', text: 'Choisissez un fichier' },
      { country: 'ישראל', text: 'בחירת קובץ' },
      { country: 'Nederland', text: 'Bestand kiezen' },
      { country: 'Deutschland', text: 'Datei auswählen' },
      { country: 'Italia', text: 'Scegli file' },
      { country: 'България', text: 'Изберете файл' },
      { country: '日本語', text: 'ファイルを選択' }
  ];

  for (const { country, text } of languages) {
      await organizePage.selectLanguage(country);
      await organizePage.verifyChooseFileText(text);
  }
});

test.beforeEach(async ({ page }) => {
  organizePage = new OrganizePage(page);
  await page.goto(baseURL);
  await organizePage.bannerCloseIcon();
});

test.afterEach(async ({ page }) => {
  await page.close();
});