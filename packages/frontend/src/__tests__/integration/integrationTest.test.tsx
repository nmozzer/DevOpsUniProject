import { test, expect, PlaywrightTestArgs, Dialog } from '@playwright/test';

/* eslint-disable */
test('Test Routes', async ({ page }: PlaywrightTestArgs) => {
    // Go to https://beta.dev-ops-assignment.nicksjm.people.amazon.dev/
    await page.goto('https://beta.dev-ops-assignment.nicksjm.people.amazon.dev/');
    // Click text=Sign In |
    await page.locator('text=Sign In |').click();
    await expect(page).toHaveURL('https://beta.dev-ops-assignment.nicksjm.people.amazon.dev/signIn');
    // Click input[type="text"]
    await page.locator('input[type="text"]').click();
    // Fill input[type="text"]
    await page.locator('input[type="text"]').fill('TestTest');
    // Press Tab
    await page.locator('input[type="text"]').press('Tab');
    // Fill input[type="password"]
    await page.locator('input[type="password"]').fill('testtesttest');
    // Click button:has-text("Sign In")
    page.once('dialog', (dialog: Dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.locator('button:has-text("Sign In")').click();
    await expect(page).toHaveURL('https://beta.dev-ops-assignment.nicksjm.people.amazon.dev/signIn');
    // Click text=Enter
    await page.locator('text=Enter').click();
    await expect(page).toHaveURL('https://beta.dev-ops-assignment.nicksjm.people.amazon.dev/ideas');
    // Click text=You Must Be Signed In To View FF Ideas
    await page.locator('text=You Must Be Signed In To View FF Ideas').click();
});
