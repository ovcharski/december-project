// Currently not working, need to fix it

// import test, { Page } from '@playwright/test';
// import { readFileSync } from 'fs';

// const dragAndDropFile = async (
//   page: Page,
//   selector: string,
//   filePath: string,
//   fileName: string,
//   fileType = ''
// ) => {
//   const buffer = readFileSync(filePath).toString('base64');

//   const dataTransfer = await page.evaluateHandle(
//     async ({ bufferData, localFileName, localFileType }) => {
//       const dt = new DataTransfer();

//       const blobData = await fetch(bufferData).then((res) => res.blob());

//       const file = new File([blobData], localFileName, { type: localFileType });
//       dt.items.add(file);
//       return dt;
//     },
//     {
//       bufferData: `data:application/octet-stream;base64,${buffer}`,
//       localFileName: fileName,
//       localFileType: fileType,
//     }
//   );

//   await page.dispatchEvent(selector, 'drop', { dataTransfer });
// };

// test("simulate drag and drop file", async ({ page }) => {
//   await page.goto("https://www.dragdrop.com/test/");
//   await dragAndDropFile(page, "#demo-upload", ".assets/image1.png", "image1");
// });

// test("simulate drag and drop file PDF", async ({ page }) => {
//   await page.goto("https://test.mobisystems.com/mobipdf/online/organize");
//   await page.getByLabel('Consent', { exact: true }).click();
//   await page.getByTestId('closeIcon').click();

//   await dragAndDropFile(page, "fu-btn-choose-file", './ThinkPad_T470_Spec.pdf', 'ThinkPad_T470_Spec.PDF', 'application/pdf');
// });