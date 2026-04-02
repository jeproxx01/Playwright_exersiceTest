import {test, expect, Locator} from "@playwright/test"



test('Full Flight Booking automation', async({page}) => {


    await page.goto('https://blazedemo.com/');

    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('London');

    await page.locator('input[type="submit"]').click();

    const tablerow = await page.locator('.table tbody tr').all();

    for(const row of tablerow)
    {
        const prices = await row.locator('td').nth(5).allTextContents();
        console.log('Prices: ', prices);
    }

    const rawPrices = await page.locator('.table td:nth-child(7)').allTextContents();

    const sortedPrices = rawPrices.map(p => parseFloat(p.replace('$', ''))).sort((a, b) => a - b);

    console.log('Sorted Price: ', sortedPrices);
    console.log('Lowest Price Found: ', sortedPrices[0]);
    
   if(sortedPrices.includes(sortedPrices[0]))
   {
    await page.locator('.btn-small').nth(2).click();
   }
   else{
    console.log('Error..');
   }

   //fill out Form
    await page.fill('#inputName', 'John');
    await page.fill('#address', '1403 American Beauty Ln');
    await page.fill('#city', 'Columbus');
    await page.fill('#state', 'OH');
    await page.fill('#zipCode', '43240');
    await page.selectOption('#cardType', 'Visa'); // Optional: selects card type
    await page.fill('#creditCardNumber', '6789 0673 4523 1267');
    await page.fill('#creditCardYear', '2023');
    await page.fill('#nameOnCard', 'John Canedy');

    // Click the Purchase Flight button
    await page.click('input[type="submit"]');

    // Step 8: Confirm Purchase
    const successMsg = page.locator('h1');
    
    
    await expect(successMsg).toHaveText('Thank you for your purchase today!');
    console.log('Success !! Passed');



       

        


});