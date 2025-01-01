import { test, expect } from '@playwright/test';
import { baseURL } from '../global-setup';
import { OrganizePage } from '../pages/OrganizePage';

let organizePage: OrganizePage;

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
  await organizePage.bannerCloseIconClick();
});

test.afterEach(async ({ page }) => {
  await page.close();
});