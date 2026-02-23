
import {test, expect} from '@playwright/test'

      test.describe('Swag Labs E2E Automation', () => {

        
            test.beforeEach(async({page}) =>{

                await page.goto('https://www.saucedemo.com/');
                
            });



test('Test a full Purchase Flow', async ({page}) => {
            

            //Filling up the form 
            await page.getByPlaceholder('Username').fill('standard_user');
            await page.getByPlaceholder('Password').fill('secret_sauce');
            await page.getByRole('button', {name: 'Login'}).click();

            //Asserting if the URL is Being on INVENTORY
            await expect (page).toHaveURL(/\/inventory.html/);
            //Asserting the "Product title" is being displayed
            await expect (page.getByText('Products')).toBeVisible();
            
            //Navigating to the Cart and Checkout
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.getByText('Your Cart')).toBeVisible(); //asserting if the page is displayed 
            await page.getByRole('button', {name: 'Checkout'}).click();
            
            //Filling up the form for Checkout
            await page.getByPlaceholder('First Name').fill('Jeffrey');
            await page.getByPlaceholder('Last Name').fill('Cesar');
            await page.getByPlaceholder('Zip/Postal Code').fill('6319');
            await page.getByRole('button', {name: 'Continue'}).click();
            await expect(page.getByText('Checkout: Overview')).toBeVisible();//asserting if the overview is Displayed
            await page.getByRole('button', {name: 'finish'}).click();

            //Asserting the Expected Result Message 
            await expect(page.getByText('Thank you for your Order')).toBeVisible();
        });

    });