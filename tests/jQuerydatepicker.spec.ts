import {test, expect} from '@playwright/test'



test('JQuery datepicker', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dateInput = page.locator('#datepicker');
    expect(dateInput).toBeVisible();


    //Approach 1: fill() method
    //await dateInput.fill('06/20/2025');



    //Approach 2: using date picker

    await dateInput.click();


    const year = '2027';
    const month = 'May';
    const date = '15';

    while(true)
    {
        const currentMonth =await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if(currentMonth===month && currentYear===year)
        {
            break;
        }

        //future
        await page.locator('.ui-datepicker-next').click();

        //Past 
        //await page.locator('.ui-datepicker-prev').click();
    }

    const allDates = await page.locator('.ui-datepicker-calendar td').all()

    for(let dt of allDates)
    {
        const dateText = await dt.innerText()
        if(dateText===date)
        {
            await dt.click()
            break;
        }
    }


    await page.waitForTimeout(5000);
});