import {test, expect} from '@playwright/test'


test('screenshot', async({page}) =>{

    await page.goto('https://demowebshop.tricentis.com/');

    const timestamp = Date.now()

    //page Screenshot
    //await page.screenshot({path: 'screenshots/' + 'homepage' + timestamp +'.png'});

    //full page Screenshot
    //await page.screenshot({path: 'screenshots/' + 'Fullpage' + timestamp +'.png', fullPage: true});


    //element Screenshot
    //await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path: 'screenshots/' + 'logo' + timestamp +'.png', });

    await page.locator('.product-grid.home-page-product-grid').screenshot({path: 'screenshots/' + 'FeaturedProduct' + timestamp +'.png', });


});