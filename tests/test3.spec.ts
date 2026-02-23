import { test, expect } from '@playwright/test';

test('Test Case 3: Product Sorting Logic', async ({ page }) => {
    // 1. Log in to the application.
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*inventory.html/);

    // 2. Select the "Price (low to high)" option from the sort dropdown.
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('lohi');

    // Expected Result: Capture the prices of the first and last items.
    // Assert that the price of the first item is less than or equal to the last item.
    const itemPrices = page.locator('.inventory_item_price');

    // Wait for the first price element to ensure items are loaded after sort
    await itemPrices.first().waitFor();

    const firstPriceText = await itemPrices.first().innerText();
    const lastPriceText = await itemPrices.last().innerText();

    const firstPrice = parseFloat(firstPriceText.replace('$', ''));
    const lastPrice = parseFloat(lastPriceText.replace('$', ''));

    console.log('First item price:', firstPrice);
    console.log('Last item price:', lastPrice);

    // Assert that the price of the first item is less than or equal to the last item
    expect(firstPrice).toBeLessThanOrEqual(lastPrice);
});
