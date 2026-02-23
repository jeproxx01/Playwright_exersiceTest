

import {test, expect} from '@playwright/test'



        test.describe('Swag Labs E2E Automation', () => {

        
            test.beforeEach(async({page}) =>{

                await page.goto('https://www.saucedemo.com/');
                
            });
          
        test('Verify User Login', async ({page}) => {



            await page.getByPlaceholder('Username').fill('standard_user');
            await page.getByPlaceholder('Password').fill('secret_sauce');
            await page.getByRole('button', {name: 'Login'}).click();

            await expect (page).toHaveURL(/\/inventory.html/);
            await expect (page.getByText('Products')).toBeVisible();

        });
        
            test('Validation of Error Handling', async ({page}) => {


            await page.getByPlaceholder('Username').fill('locked_out_user r');
            await page.getByPlaceholder('Password').fill('wrong_pass');
            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.getByText('Epic sadface')).toBeVisible();

            });
       
            test('Verify Functionality of Pricee', async ({page}) => {

            await page.getByPlaceholder('Username').fill('standard_user');
            await page.getByPlaceholder('Password').fill('secret_sauce');
            await page.getByRole('button', {name: 'Login'}).click();

            const sortDropdown = page.locator('.product_sort_container');
            await sortDropdown.selectOption('lohi');
            
            const itemPrice = page.locator('.inventory_item_price');

            await itemPrice.first().waitFor();

            const firstPriceText = await itemPrice.first().innerText();
            const lastPriceText = await itemPrice.last().innerText();


            const firstPrice = parseFloat(firstPriceText.replace('$', ''));
            const lastPrice = parseFloat(lastPriceText.replace('$', ''));


            console.log ('First Item Price: ', firstPrice);
            console.log ('Last Item Price: ', lastPrice);

            expect (firstPrice).toBeLessThanOrEqual(lastPrice);

            });

         
            



});