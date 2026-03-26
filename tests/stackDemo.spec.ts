import {test, expect} from '@playwright/test'



test('Verify Product Sorting', async({page}) => {

    await page.goto('https://www.bstackdemo.com/');
 


    const orderDropdown = page.locator('.sort select');
    
    
    await expect(orderDropdown).toBeVisible();
    await expect(orderDropdown).toBeEnabled();

    await orderDropdown.selectOption('lowestprice');
   

    
    
});

test('Retrive product name and price', async ({page}) => {

    await page.goto('https://www.bstackdemo.com/');

    const productNames = await page.locator('.shelf-item').allTextContents();
    const productPrice = await page.locator('.val b').allTextContents();


    console.log("product Price elements: ", productNames);
    
});