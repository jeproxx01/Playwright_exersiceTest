import {test, expect} from '@playwright/test'





   test.describe('Website Functional Test', () => {

    test.beforeEach(async ({page}) => {

        await page.goto('https://the-internet.herokuapp.com/');

    });


    test('Verify Form Authentication (Login)', async ({page}) => {

        await page.getByRole('link', {name: 'Form Authentication'}).click();

        await expect(page).toHaveURL(/\/login/);

        await page.locator('#username').fill('tomsmith');
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.getByRole('button', {name: 'login'}).click();
        await expect(page.locator ('#flash')).toContainText('You logged into a secure area!');
        await expect(page.getByRole('link', {name: 'Logout'})).toBeVisible();

        });  
        
        test ('Verify checkbox Functionality', async ({page}) => {

            await page.getByRole('link', {name: 'Checkboxes'}).click();
            await expect (page).toHaveURL(/checkboxes/);

            const checkboxes = page.locator('input[type= "checkbox"]');
            await checkboxes.first().check();
            await expect (checkboxes.first()).toBeChecked();
            await checkboxes.nth(1).uncheck();
           await expect (checkboxes.nth(1)).not.toBeChecked();


        });

      test ('Verify Choose File Button', async ({page}) => {


        await page.getByRole('link', {name: 'File Upload'}).click();
        await expect (page).toHaveURL(/upload/);

        await page.getByRole('button', {name: 'Choose File'}).click();
        
    });
    

   });








   