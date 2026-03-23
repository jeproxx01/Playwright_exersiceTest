import {test, expect} from "@playwright/test"



test("Comparing Methods", async({page}) =>  {

    await page.goto('https://demowebshop.tricentis.com/');

    const products = page.locator('.product-title');


     //1. innertext() vs TextContent()

    //console.log(await products.nth(1).innerText());
     //console.log(await products.nth(1).textContent());

     /*
     const count = await products.count();

     for(let i=0; i<count; i++)
     {
        //const productName = await products.nth(i).innerText();
        //console.log(productName);

        //const productName = await products.nth(i).textContent();
        //console.log(productName);

        const productName = await products.nth(i).textContent();
        console.log(productName?.trim());
     }
        */

     //2. allInnerText vs allTextContent

    //const productNames = await products.allInnerTexts();
    //console.log('product names capture by allINnerText', productNames);

    //const productNames = await products.allTextContents();
    //console.log('product names capture by allTextContent', productNames);

    //const allText = productNames.map(text => text.trim());
    //console.log('Trimmed Title: ',allText);


    //3. all() ==> converts Locator===> Locators[]
    //returns array of Locators

    const productLocators = await products.all();
    console.log(productLocators);

    //console.log(await textAll[1].innerText());

    for(let productLoc of productLocators)
    {
        console.log(await productLoc.innerText());
    }
});