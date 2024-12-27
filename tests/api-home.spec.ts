import test, { expect, request } from "@playwright/test";

test.describe('API Home Tests', () => {

test('Get status 200', async ({ request }) => {
    const response = await request.get('https://test.mobisystems.com/mobipdf/online/organize');
    expect(response.status()).toBe(200);
});

test('Check response headers', async ({ request }) => {
    const response = await request.get('https://test.mobisystems.com/mobipdf/online/organize');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('text/html');
});

test('Check response time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('https://test.mobisystems.com/mobipdf/online/organize');
    const endTime = Date.now();
    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(2000); // Response time should be less than 2 seconds
});

test('Check response body', async ({ request }) => {
    const response = await request.get('https://test.mobisystems.com/mobipdf/online/organize');
    const body = await response.text();
    expect(body).toContain('<title>MobiPDF Online</title>');
    expect(body).toContain('<meta name="robots" content="noindex, nofollow" />');
});

// test('Check invalid endpoint', async ({ request }) => {
//     const response = await request.get('https://test.mobisystems.com/mobipdf/online/invalid-endpoint');
//     expect(response.status()).toBe(404);
// });

});