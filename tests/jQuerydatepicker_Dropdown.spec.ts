import {test, expect} from '@playwright/test'


test('jQuery Date Picker Dropdown', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('#txtDate').click();


    await page.locator('.ui-datepicker-month').selectOption('Oct');
    await page.locator('.ui-datepicker-year').selectOption('2024');


    const day = '15';
    let dateSelected = false;

    const allDates = await page.locator('.ui-datepicker-calendar tbody').locator('td').all();

    for(let date of allDates)
    {
        const dateText = await date.innerText();

        if(dateText === day)
        {
            await date.click();
            dateSelected =true;
            break;

        }
    }

    expect(dateSelected).toBeTruthy();
    await page.waitForTimeout(5000);
   
});


test('select Date Range Using fill', async({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const startDateInput = page.locator('#start-date');
    const endDateInput = page.locator('#end-date');


    await startDateInput.fill('2010-07-07'); 
    await endDateInput.fill('2017-12-12');

    // 4. Click the Submit button
    await page.locator('button.submit-btn').click();

    expect(startDateInput).toHaveValue('2010-07-07');
    expect(endDateInput).toHaveValue('2017-12-12');

    await page.waitForTimeout(5000);

});
