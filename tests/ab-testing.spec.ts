import {test, expect} from '@playwright/test'



    test.describe('HomePage Links', () => {
        test.beforeEach(async ({page}) => {
        
            //Uses Same homePage URL
            //Navigates to homepage
            await page.goto('https://the-internet.herokuapp.com/');
        });
    

   

test('A/B Testing Link Navigates correctly', async({page}) => {

     // Navigate to homepage
    // await page.goto('https://the-internet.herokuapp.com/');
      // Click the A/B Testing link
    await page.getByRole('link', {name: 'A/B Testing'}).click();
    // Assert URL changed correctly
    await expect(page).toHaveURL(/\/abtest/);

    // Assert heading exists (dynamic text safe)
    const heading = page.getByRole('heading');
    await expect(heading).toBeVisible();

});




test('Add/Remove Element ', async ({page}) => {

    await page.getByRole('link', {name: 'Add/Remove Elements'}).click();

    await expect(page).toHaveURL(/add_remove_elements/);

    const addBtn = page.getByRole('button', {name: 'Add Element'});
    await addBtn.click();  

    const deleteBtn = page.getByRole('button', {name: 'Delete'});
    await expect(deleteBtn).toBeVisible();

});

}); //Closing bracket