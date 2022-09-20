import { test, expect } from '@playwright/test';

/* eslint-disable */
test('test', async ({ page }: any) => {
    // Go to https://test.dev-ops-assignment.nicksjm.people.amazon.dev/
    await page.goto('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/');

    // Click text=Enter
    await page.locator('text=Enter').click();
    await expect(page).toHaveURL('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/ideas');

    // Click text=SignIn |
    await page.locator('text=SignIn |').click();
    await expect(page).toHaveURL('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/signIn');

    // Click input[type="text"]
    await page.locator('input[type="text"]').click();

    // Fill input[type="text"]
    await page.locator('input[type="text"]').fill('TestTest');

    // Press Tab
    await page.locator('input[type="text"]').press('Tab');

    // Fill input[type="password"]
    await page.locator('input[type="password"]').fill('testtesttest');

    // Click button:has-text("Sign In")
    await page.locator('button:has-text("Sign In")').click();
    await expect(page).toHaveURL('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/ideas');

    // Click text=SignOut
    await page.locator('text=SignOut').click();
    await expect(page).toHaveURL('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/');

    // Click text=Enter
    await page.locator('text=Enter').click();
    await expect(page).toHaveURL('https://test.dev-ops-assignment.nicksjm.people.amazon.dev/ideas');
});
