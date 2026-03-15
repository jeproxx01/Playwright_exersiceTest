import {test, expect} from '@playwright/test'



test('Verify Product Sorting', async({page}) => {

    await page.goto('https://www.bstackdemo.com/');
 


    const orderDropdown = page.getByRole('combobox');
    await orderDropdown.selectOption('lowestprice');

    await expect(orderDropdown).toBeVisible();
   

    
    
});

test('Retrive product name and price', async ({page}) => {

    await page.goto('https://www.bstackdemo.com/');

    
    
});