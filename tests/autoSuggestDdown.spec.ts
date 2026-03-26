import {test, expect, Locator} from "@playwright/test"



test('Auto Suggesting Dropdowns', async({page}) => {

    await page.goto('https://www.flipkart.com');
    
    // Close login popup if it appears (Flipkart often has a span with role button to close it)
    try {
        const closeBtn = page.locator('span[role="button"]').first();
        await closeBtn.waitFor({ state: 'visible', timeout: 3000 });
        await closeBtn.click();
    } catch (e) {
        console.log("No login popup appeared.");
    }

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