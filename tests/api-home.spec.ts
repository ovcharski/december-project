import test, { expect, request } from "@playwright/test";

test.describe('API Home Tests', () => {

    const baseUrl = 'https://test.mobisystems.com/mobipdf/online';

    test('Get status 200', async ({ request }) => {
        const response = await request.get(`${baseUrl}/organize`);
        expect(response.status()).toBe(200);
    });

    test('Check response headers', async ({ request }) => {
        const response = await request.get(`${baseUrl}/organize`);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toBe('text/html');
    });

    test('Check response time', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.get(`${baseUrl}/organize`);
        const endTime = Date.now();
        expect(response.status()).toBe(200);
        expect(endTime - startTime).toBeLessThan(2000); // Response time should be less than 2 seconds
    });

    test('Check response body', async ({ request }) => {
        const response = await request.get(`${baseUrl}/organize`);
        const body = await response.text();
        expect(body).toContain('<title>MobiPDF Online</title>');
        expect(body).toContain('<meta name="robots" content="noindex, nofollow" />');
    });

// test('Check invalid endpoint', async ({ request }) => {
//     const response = await request.get(`${baseUrl}/invalid-endpoint`);
//     expect(response.status()).toBe(404);
// });

// test('Check JSON response', async ({ request }) => {
//     const response = await request.get(`${baseUrl}/json-endpoint`);
//     expect(response.status()).toBe(200);
//     expect(response.headers()['content-type']).toBe('application/json');
//     const jsonResponse = await response.json();
//     expect(jsonResponse).toHaveProperty('key');
// });

// test('Check POST request', async ({ request }) => {
//     const response = await request.post(`${baseUrl}/submit`, {
//         data: { key: 'value' }
//     });
//     expect(response.status()).toBe(201);
//     const jsonResponse = await response.json();
//     expect(jsonResponse).toHaveProperty('success', true);
// });

// test('Check PUT request', async ({ request }) => {
//     const response = await request.put(`${baseUrl}/update`, {
//         data: { key: 'newValue' }
//     });
//     expect(response.status()).toBe(200);
//     const jsonResponse = await response.json();
//     expect(jsonResponse).toHaveProperty('updated', true);
// });

//     test('Check DELETE request', async ({ request }) => {
//         const response = await request.delete(`${baseUrl}/delete`);
//         expect(response.status()).toBe(204);
//     });

});