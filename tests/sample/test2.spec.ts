
import {test, expect} from '@playwright/test';


test ('page has title', async ({page}) => {

    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle('The Internet');

});

    
    
    
    



