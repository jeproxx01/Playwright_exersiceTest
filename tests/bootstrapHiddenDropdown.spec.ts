import {test, expect,} from "@playwright/test"


test("Bootstrap Hidden Dropdowns", async({page}) => {


    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Login
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();


    //PIM
    await page.getByText('PIM').click();

    //click on the Job Title dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

    //capture all the options in the dropdown
    const options = page.locator('div[role="listbox"] span');
    const count = await options.count();

    console.log("count of options inside the dropdown: ", count);

    //print all the text contents
    console.log('All the text content: ', await options.allTextContents());

    for(let i=0; i<count; i++)
    {
        console.log(await options.nth(i).innerText());
    }


    //select/click on option

    for(let i=0; i<count; i++)
    {
       const text =  await options.nth(i).innerText()
       if(text === 'Software Engineer')
       {
        await options.nth(i).click();
        break;
       }
    }



    await page.waitForTimeout(3000);



});