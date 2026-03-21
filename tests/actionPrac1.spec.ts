import {test, expect, Locator} from '@playwright/test'





test("Verifying Form Input", async ({page}) => {

     await page.goto('https://testautomationpractice.blogspot.com/');


    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');

    await nameInput.fill('Jeprox Cesar');
    await emailInput.fill('Jep@email.com');

    await expect (nameInput).toHaveValue('Jeprox Cesar');
    await expect (emailInput).toHaveValue('Jep@email.com');

    //Radio

    const radioMale = page.locator('input[value="male"]');

    await radioMale.check();
    await expect (radioMale).toBeChecked();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const checkboxes = days.map(day =>page.getByLabel(day));
    expect (checkboxes.length).toBe(7);

    
    const indexes = [0,2,4];


    for(const i of indexes)
    {
        await(checkboxes[i]).check()
        await expect(checkboxes[i]).toBeChecked();
    }

    await page.waitForTimeout(5000);
});

test('Verify Dropdown Functionality', async ({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown = page.locator('#country');
    const colorDropdown = page.locator('#colors');

    await dropdown.selectOption('Canada');
    await expect(dropdown).toHaveValue('canada');

    await colorDropdown.selectOption('Blue');
    await expect (colorDropdown).toHaveValues(['blue']);
    
    await page.waitForTimeout(5000);
});

test('verify Alert Functionality', async({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    
    
});

