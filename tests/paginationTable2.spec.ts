import {test, expect} from '@playwright/test'



test('Read and print data from the Pagination Table', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    let currentPage = 1;
    let hasNextPage = true;

    while(hasNextPage)
    {
        const rows = await page.locator('#productTable tbody tr').all();
        for(const row of rows)
        {
            const name = await row.locator('td').nth(1).innerText();
            const price = await row.locator('td').nth(2).innerText();
            console.log(`Product: ${name} | Price: ${price}`);
        }

        currentPage++;
        const nextPageButton = page.locator('#pagination li a').filter({hasText: `${currentPage}`});
        if(await nextPageButton.isVisible()){
            await nextPageButton.click();
            await page.waitForTimeout(3000);
        }
        else{
            console.log('Reached the Last Page....');
            hasNextPage=false;
        }

    }

});