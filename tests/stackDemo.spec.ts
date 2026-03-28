import {test, expect} from '@playwright/test'


 
test('Verify Product Sorting', async({page}) => {

    //1. 
    await page.goto('https://www.bstackdemo.com/');
 

    //2. 
    const orderDropdown = page.locator('.sort select');
    
    
    await expect(orderDropdown).toBeVisible();
    await expect(orderDropdown).toBeEnabled();

    await orderDropdown.selectOption('lowestprice');
   await page.waitForTimeout(3000);
 
    const name = page.locator('.shelf-item__title');
    const prices = page.locator('.val b');

    const productNames = await page.locator('.shelf-item__title').allTextContents();
    const productPrice = await page.locator('.val b').allTextContents();


    console.log("product names elements: ", productNames);
    console.log("product prices", productPrice);

    

    //Verifies if both counts are equal
    const prodCount = await name.count();
    const priceCount = await prices.count();

    if(prodCount === priceCount)

    {
        console.log('Prices counts are equal...');
    }


    //Prints Product Name along with its Price
    console.log('product name length: ', productNames.length);
    console.log('product price length: ', productPrice.length);
    
    expect(productNames && productPrice).toHaveLength(25);

    for(let i=0; i<productNames.length; i++)
    {
        console.log(`Product Name: ${productNames[i]} | $${productPrice[i]}`);
    }

    const lowestName = productNames[0];
    const lowestPrice = productPrice[0];

    console.log('\n Lowest Price Product...');
    console.log(`Lowest Name: ${lowestName} | lowest Price: $${lowestPrice}`);


    const highestProd = productNames[24];
    const highestPrice = productPrice[24];

    console.log('\n Highest Product Name with Price...');
    console.log(`Highest Name: ${highestProd} | Highest Price: $${highestPrice}`);
    
});