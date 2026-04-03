import {test, expect} from'@playwright/test'


test('Booking.com Date Picker test', async({page}) => {

    await page.goto('https://www.booking.com/')

    await page.waitForTimeout(3000);
    
    //Popup signup 
    //const popSignup = page.getByLabel('Sign in, save money');

    const popSignup = page.locator('.a5c71b0007');

    if(await popSignup.isVisible())
    {
        await page.getByRole('button', { name: 'Dismiss sign-in info.' }).click(); 
    }
    else{
        console.log('No Sign up Popup...')
    }

    await page.getByTestId('searchbox-dates-container').click()

    //check-in-date selection

    let checkinyear = '2026';
    let checkinMonth = 'June';
    let checkinDay = '20';


    //Navigate through the calendar to find desired check-in month and year.
    while(true)
    {
        const checkinMonthYear = await page.locator("h3[aria-live='polite']").nth(0).innerText();
        //split the months and the year
        const currentMonth = checkinMonthYear.split(" ")[0] //month
        const currentYear = checkinMonthYear.split(" ")[1] //year
    
        if(currentMonth === checkinMonth && currentYear === checkinyear)
        {
            break;
        }
        else{
            await page.locator('button[aria-label= "Next month"]').click()
        }
    }
    
    //Select the Specific Date

    let allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all()
    let checkinDateSelected = false;

    for(let date of allDates)
    {
        const dateText = await date.innerText();
        if(dateText===checkinDay)
        {
            await date.click();
            checkinDateSelected = true;
            break;
        }
    }

    //Assertion to confirm checkin date is selected
    expect(checkinDateSelected).toBeTruthy(); //true


    //Checkout-date Selection

    let checkoutYear = '2026';
    let checkoutMonth = 'July';
    let checkoutDay = '25';


    //Navigate to the Required check-out month and year

    while(true)
    {
        const checkoutMonthYear = await page.locator("h3[aria-live='polite']").nth(1).innerText();
        //split the months and the year
        const currentMonth = checkoutMonthYear.split(" ")[0] //month
        const currentYear = checkoutMonthYear.split(" ")[1] //year
    
        if(currentMonth === checkoutMonth && currentYear === checkoutYear)
        {
            break;
        }
        else{
            await page.locator('button[aria-label= "Next month"]').click()
        }
    }
    
    //Select the Specific Date

    allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all()
    let checkoutDateSelected = false;

    for(let date of allDates)
    {
        const dateText = await date.innerText();
        if(dateText===checkoutDay)
        {
            await date.click();
            checkoutDateSelected = true;
            break;
        }
    }

    //Assertion to confirm checkin date is selected
    expect(checkoutDateSelected).toBeTruthy(); //true

    await page.waitForTimeout(5000);

});