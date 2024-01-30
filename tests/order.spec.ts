import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Locke Bio/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the new order button.
  await page.getByRole('button', { name: 'New Order' }).click();

  // Expects page to have a heading with the name of title and fill the form.
  await expect(page.getByRole('dialog', { name: 'Add New Order' })).toBeVisible();

  await page.getByLabel('Product').fill('Productcp');
  await page.getByRole('spinbutton', { name: '* Quantity :' }).fill('2', { force: true });
  await page.getByLabel('client Name').fill('namee');
  await page.getByLabel('client Address').fill('address');
  await page.getByLabel('client City').fill('city');
  await page.getByLabel('client Country').fill('countryt');
  await page.getByLabel('client State').fill('ssss');
  await page.getByLabel('clientZipcode').fill('111222');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expects having success message
  await expect(page.getByText('New order has been created successfully.')).toBeVisible();
});
