import {test, expect, Page} from '@playwright/test'

 async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean){


      while(true)
    {
        const currentMonth =await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if(currentMonth===targetMonth && currentYear===targetYear)
        {
            break;
        }

        if(isFuture)
        {
        //future
        await page.locator('.ui-datepicker-next').click();
        }else{
        //Past 
        await page.locator('.ui-datepicker-prev').click();
        }
    }

    const allDates = await page.locator('.ui-datepicker-calendar td').all()

    for(let dt of allDates)
    {
        const dateText = await dt.innerText()
        if(dateText===targetDate)
        {
            await dt.click()
            break;
        }
    }
 }


test('JQuery datepicker', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dateInput = page.locator('#datepicker');
    expect(dateInput).toBeVisible();


    //Approach 1: fill() method
    //await dateInput.fill('06/20/2025');



    //Approach 2: using date picker

    await dateInput.click();


    //Future Target Date
    const year = '2027';
    const month = 'May';
    const date = '15';

    /*
    //past Target Date
    const year = '2024';
    const month = 'May';
    const date = '15';
    */

  selectDate(year, month, date, page, true) //pastDate = false

    const expectedDate = "05/15/2027";
    await expect(dateInput).toHaveValue(expectedDate);


    await page.waitForTimeout(5000);
});