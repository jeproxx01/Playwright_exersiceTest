import {test, expect, Locator} from "@playwright/test"



test('Auto Suggesting Dropdowns', async({page}) => {

    // Use 'domcontentloaded' instead of default 'load'. E-commerce sites load many external scripts
    // which can easily cause the 'load' event to timeout or get aborted in CI environments (like GitHub actions).
    await page.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded' });
    
    // Wait at least 3 seconds for the login popup to potentially appear
    await page.waitForTimeout(3000);

    const emailInput = page.locator('form').filter({ hasText: 'Enter Email/Mobile' }).getByRole('textbox');
    const requestOtpBtn = page.getByRole('button', { name: 'Request OTP' });

    // Check if the login popup is visible without throwing an error
    if (await emailInput.isVisible() && await requestOtpBtn.isVisible()) {
        await expect(emailInput).toBeVisible();
        await expect(requestOtpBtn).toBeVisible();
        
        // Close the login page
        await page.getByRole('button', { name: '✕' }).click();
    } else {
        console.log("No login popup appeared.");
    }

    // Verify we can see the search box after handling the login page
    await expect(page.getByRole('textbox', { name: 'Search for Products, Brands' })).toBeVisible();

    await page.locator("input[name='q']").first().fill('smart');
    await page.waitForTimeout(5000);


    const options: Locator = page.locator("ul>li");
    const count = await options.count();

    console.log('number of suggested opt: ', count);

    // Use allTextContents() for fast batch retrieval (no slow per-element loop)
    const allTexts = await options.allTextContents();
    allTexts.forEach((text, i) => console.log(`Option ${i}: ${text}`));

    console.log("5th option:", allTexts[5]);

    // Re-type to re-trigger the dropdown (it may have closed during text retrieval)
    await page.locator("input[name='q']").first().fill('');
    await page.locator("input[name='q']").first().fill('smart');
    await page.waitForTimeout(3000);

    // Remove the Escape keypress because it closes the dropdown!
    
    // Directly dispatch a click event to bypass strict visibility checks caused by complex CSS/overlays.
    const smartphoneOption = page.locator("ul>li").filter({ hasText: 'smartphone' }).first();
    await smartphoneOption.dispatchEvent('click');
});