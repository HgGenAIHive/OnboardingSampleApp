// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Customer Info Tab', () => {
  test('should navigate to Customer Info tab with form when clicking a customer card', async ({ page }) => {
    await page.goto('/');

    // Wait for customer card to load and click it
    await page.locator('.customer-card').first().click();

    // Should switch to Customer Info tab
    await expect(page.getByRole('button', { name: 'Customer Info' })).toHaveClass(/active/);

    // Form should be populated with customer data
    await expect(page.locator('#name')).toHaveValue('Acme Corporation');
    await expect(page.locator('#industry')).toHaveValue('Manufacturing');
    await expect(page.locator('#region')).toHaveValue('North America');
    await expect(page.locator('#contactEmail')).toHaveValue('onboarding@acme.example.com');
  });

  test('should save edited customer info and show success message', async ({ page }) => {
    await page.goto('/');

    // Click customer card to navigate to form
    await page.locator('.customer-card').first().click();
    await expect(page.locator('#name')).toHaveValue('Acme Corporation');

    // Edit a field
    await page.locator('#industry').fill('Technology');

    // Save
    await page.locator('.btn-primary').click();

    // Success message should appear
    await expect(page.locator('.message-success')).toContainText('saved successfully');
  });

  test('should show prompt when no customer is selected', async ({ page }) => {
    await page.goto('/');

    // Click Customer Info tab directly without selecting a customer
    await page.getByRole('button', { name: 'Customer Info' }).click();

    // Should show prompt to select a customer
    await expect(page.locator('.placeholder')).toContainText('select a customer');
  });
});
