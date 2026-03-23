import {test, expect, Locator} from "@playwright/test"



test('Auto Suggesting Dropdowns', async({page}) => {

    await page.goto('https://www.flipkart.com');
    await page.locator("input[name='q']").first().fill('smart');
    await page.waitForTimeout(5000);


    const options: Locator = page.locator("ul>li");
    const count = await options.count();

    console.log('number of suggested opt: ', count);

    await page.waitForTimeout(3000);

    console.log("5th option:",await options.nth(5).innerText());

    
    for(let i=0; i<count; i++)
    {
        console.log(await options.nth(i).innerText());
    }
    

    for(let i=0; i<count; i++)
    {
        const text = await options.nth(i).innerText();
        if(text==='smartphone')
        {
            options.nth(i).click();
            break;
        }
    }
});