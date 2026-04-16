/*
only
skip
fail
fixme
slow
*/

import { test, expect } from '@playwright/test';

//only
test('test1', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

//skip
test.skip('test2', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

//skip the test based on some condition
test('test3', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'this test skipped if browser is firfox');

  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

//fail
test('test4', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});


test.fixme('test5', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

test('test6', async ({ page }) => {
    test.slow();
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});