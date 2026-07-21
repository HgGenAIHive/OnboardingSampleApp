// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Onboarding Dashboard', () => {
  test('should display the dashboard heading', async ({ page }) => {
    await page.goto('/');

    // Verify the main heading is visible
    await expect(page.locator('h1')).toContainText('Onboarding Dashboard');
  });

  test('should show navigation tabs', async ({ page }) => {
    await page.goto('/');

    // Verify all navigation tabs are present
    await expect(page.locator('.tab')).toHaveCount(5);
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Customer Info' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Data Mapping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tenant Setup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Import' })).toBeVisible();
  });

  test('should display sample customers in onboarding queue', async ({ page }) => {
    await page.goto('/');

    // Wait for data to load and verify sample customers are shown
    await expect(page.locator('.customer-card')).toHaveCount(4);
    await expect(page.locator('.customer-card h3').first()).toContainText('Acme Corporation');
  });

  test('should switch between tabs', async ({ page }) => {
    await page.goto('/');

    // Click on Customer Info tab
    await page.getByRole('button', { name: 'Customer Info' }).click();

    // Verify the add-customer form is shown
    await expect(page.locator('main h2')).toContainText('Customer Info');
    await expect(page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  });

  test('should add and then remove a customer', async ({ page }) => {
    await page.goto('/');

    // Add a new customer via the Customer Info tab
    await page.getByRole('button', { name: 'Customer Info' }).click();
    await page.getByLabel('Name*').fill('Playwright Test Co');
    await page.getByRole('button', { name: 'Add Customer' }).click();
    await expect(page.getByText('Playwright Test Co added to the onboarding queue')).toBeVisible();

    // Verify it now appears in the dashboard queue
    await page.getByRole('button', { name: 'Dashboard' }).click();
    await expect(page.locator('.customer-card', { hasText: 'Playwright Test Co' })).toBeVisible();

    // Remove it and verify it disappears
    page.once('dialog', dialog => dialog.accept());
    await page
      .locator('.customer-card', { hasText: 'Playwright Test Co' })
      .getByRole('button', { name: 'Remove' })
      .click();
    await expect(page.locator('.customer-card', { hasText: 'Playwright Test Co' })).toHaveCount(0);
  });
});
