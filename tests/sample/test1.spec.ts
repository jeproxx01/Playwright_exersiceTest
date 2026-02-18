import { test, expect } from "@playwright/test";

test("Verify page title", async ({ page }) => {
  await page.goto("https://fuelflow25.vercel.app/");

  let title: string = await page.title();
  console.log("title:", title);

  await expect(page).toHaveTitle(/FuelFlow/);
});
