import {test, expect} from "@playwright/test"


test('Read Data from all the table pages', async({page}) => {

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');


    let hasmorepages = true;

    while(hasmorepages)
    {
        const rows = await page.locator('#example tbody tr').all()
        for(let row of rows)
        {
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000);

     const nextButton = page.locator("button[aria-label='Next']");
     const isDisabled = await nextButton.getAttribute('class');//dt-paging-button disabled next

        if(isDisabled?.includes('disabled'))
        {
            hasmorepages = false;
        }
        else{
            await nextButton.click();
        }
    }
    await page.waitForTimeout(5000);
});

test('Filter the rows and check the rows count', async({page}) => {

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    const dropdwon = page.locator("#dt-length-0");
    await dropdwon.selectOption('25');


    //Approach 1
    const rows = await page.locator('#example tbody tr').all(); //use "length" in asserting when using "all()" method.
    expect(rows.length).toBe(25);

    //Approach 2

    const rows2 = page.locator('#example tbody tr');
    expect(rows2).toHaveCount(25);

    await page.waitForTimeout(5000);

});

test("Search For specific data in the table", async({page}) => {

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');


    const searchbox = page.locator("#dt-search-0");
    await searchbox.fill('Paul Byrd');

    const rows = await page.locator('#example tbody tr').all();

    if(rows.length>=1)
    {
        let matchFound = false;
        for(let row of rows)
        {
            const text = await row.innerText();
            if(text.includes('Paul Byrd'))
            {
                console.log('Record Exist-Found');
                matchFound = true;
                break;
            }
        }
        //expect(matchfound).toBe(true);
        expect(matchFound).toBeTruthy();
    }
    else
    {
        console.log('No Rows Found with search text');
    }

    await page.waitForTimeout(5000);
});