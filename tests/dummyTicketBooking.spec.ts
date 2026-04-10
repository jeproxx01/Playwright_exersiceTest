import { test, expect, Page } from '@playwright/test';

// REUSABLE FUNCTION: Handles the jQuery Date Picker
async function selectDate(page: Page, selector: string, year: string, month: string, day: string) {
    
    await page.locator(selector).click();

    await page.locator('#ui-datepicker-div').waitFor({ state: 'visible', timeout: 5000 });

    // 2. Select the Year from the dropdown
    await page.locator('.ui-datepicker-year').selectOption(year);

    // 3. Select the Month from the dropdown (Uses Label like "Mar" or "Nov")
    await page.locator('.ui-datepicker-month').selectOption({ label: month });

    // 4. Click the exact Day
    // We use a Regular Expression ^day$ to ensure "2" doesn't match "22"
    await page.locator('.ui-datepicker-calendar a', { hasText: new RegExp(`^${day}$`) }).click();
}

test('Full Dummy Ticket Booking Automation', async ({ page }) => {
    
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/?wmc-currency=PHP');

    
    await page.locator('#product_549').check(); // Dummy ticket for Visa Application

    await page.locator('#travname').fill('Akash');
    await page.locator('#travlastname').fill('Ratore');
    
    // Use reusable function for Date of Birth
    await selectDate(page, '#dob', '2001', 'Mar', '2');
    
    await page.locator('#sex_1').check(); // Male

    // Step 4: Enter Travel Details
    await page.locator('#traveltype_1').check(); // One-way
    await page.locator('#fromcity').fill('Toronto');
    await page.locator('#tocity').fill('Mumbai');
    
    // Use reusable function for Departure Date
    await selectDate(page, '#departon', '2026', 'Nov', '25');

    // Step 5: Additional Information
    await page.locator('#notes').fill('Need visa as soon as possible');

    // Step 6: Delivery Options
    //await page.locator('#select2-reasondummy-container').selectOption('Prefer not to say'); // Purpose
    
    // Use reusable function for Appointment Date
    await selectDate(page, '#appoinmentdate', '2026', 'Dec', '10');
    
    await page.locator('#deliverymethod_1').check(); // Email

    // Step 7: Enter Billing Details
    await page.locator('#billname').fill('Akash Rathore');
    await page.locator('#billing_phone').fill('+12345678956');
    await page.locator('#billing_email').fill('abc.123@gmail.com');
    await page.locator('#billing_country').selectOption({ label: 'Canada' });
    await page.locator('#billing_address_1').fill('123 Scott Street, Niagara Falls, Ontario, L2C 6M1');


    // Step 8: Purchase (Optional - be careful on live sites!)
    // await page.locator('#place_order').click();

    // 1. Verify Product Name and Quantity
    const productRow = page.locator('.cart_item');
    await expect(productRow.locator('.product-name')).toContainText('Dummy ticket for Visa Application');
    await expect(productRow.locator('.product-quantity')).toContainText('1');


    const subtotal = page.locator('.cart-subtotal bdi');
    const orderTotal = page.locator('.order-total bdi');

    await expect(subtotal).toContainText(/1,134/);
    await expect(orderTotal).toContainText(/1,134/);

    console.log('Success !! All fields and prices verified.');
    
    console.log('Form filled successfully using reusable date function.');

    await page.waitForTimeout(5000);
});