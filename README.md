# MobiPDF Online Testing

This project contains automated tests for the MobiPDF Online application using Playwright. The tests cover various functionalities including file uploads, language changes, mobile device compatibility, and API endpoints.

## Setup

**Install Dependencies**:
```sh
npm install
```
**Running Tests**
To run all tests, use the following command:
```sh
npx playwright test
```
Before the tests a `global-setup.ts` script will initialize the browser context and save the state

To run a specific test file, use the following command:
```sh
npx playwright test tests/file-upload-positive.spec.ts
```
By default, tests run in headless mode. To run tests in headful mode, use the --headed flag:
```sh
npx playwright test --headed
```
Run tests with UI Mode for a better developer experience with time travel debugging, watch mode and more:
```sh
npx playwright test --ui
```
**Updating Playwright**
To update Playwright to the latest version run the following command:
```sh
npm install -D @playwright/test@latest
# Also download new browser binaries and their dependencies:
npx playwright install --with-deps
```
You can always check which version of Playwright you have by running the following command:
```sh
npx playwright --version
```
**System requirements**
Node.js 18+
Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL)
macOS 13 Ventura, or later
Debian 12, Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture


## Page Object Model

The project uses the Page Object Model (POM) pattern. The page objects are defined in the pages directory. For example, the `OrganizePage` class is defined in `OrganizePage.ts`.

Encapsulation - The Page Object encapsulates both actions and assertions related to the page.
Reusability - reuse methods across different tests that require similar checks.
Clarity - keeps  test code clean.

Further improvement (skipping initializing the same objects over and over again) could be done using Playwright Fixtures. More information: [Documentation](https://playwright.dev/docs/test-fixtures), YouTube [Video 1](https://www.youtube.com/watch?v=k488kAtT-Pw), [Video 2](https://www.youtube.com/watch?v=rRmfYu8hlbw)

## Reports

Test reports are generated in the `playwright-report` directory. Open `index.html` to view the test report.

## Known Issues

Using Chromium 100% of the tests pass. Using Gecko ~5 of 29 tests fail. Probably timeout issues, should investigate.

## Improvements

More test regarding file manipulation after upload could be written.

The file uploading in the tests rely on using [setInputFiles() method](https://playwright.dev/docs/input#upload-files). Drag and Drop upload probably can be tested too.