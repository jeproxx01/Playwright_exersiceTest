import {test, expect} from "@playwright/test"


test('Verify Chrome CPU load in Dynamic Table', async({page}) => {


    await page.goto('https://practice.expandtesting.com/dynamic-table');

    const table = page.locator('.table tbody');
    await expect(table).toBeVisible();

    //Select all the rows, then find the number of rows
    const rows = await table.locator('tr').all();
    console.log('numbers of rows in a table: ', rows.length);
    expect(rows).toHaveLength(4);

    //Step 1: For Chrome process get the value of CPU load
    //Read each row to check Chrome presence

    let cpuLoad = '';
    for(const row of rows)
    {
        const processName= await row.locator('td').nth(0).innerHTML();
        console.log(processName);
        if(processName === "Chrome")
        {
            cpuLoad = await row.locator("td", {hasText: '%'}).innerText();
            console.log('CPU Load of Chrome: ', cpuLoad);
            break;
        }
    }

    //Step 2: Compare it with the value in the yellow label

    let yellowboxtext = await page.locator('#chrome-cpu').innerText(); 
    console.log("Chrome CPU load From Yellow box: ", yellowboxtext);

    if(yellowboxtext.includes(cpuLoad))
    {
        console.log("CPU load of Chrome is equal");
    }else
    {
        console.log("CPU load of Chrome not equal");
    }

    expect(yellowboxtext).toContain(cpuLoad);



    await page.waitForTimeout(5000);

});

 test('Verifying Memory Size of Firefox Process', async ({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator('#taskTable tbody');
    await expect (table).toBeVisible();

    const rows = await table.locator('tr').all();
    console.log("number of rows in the table: ", rows.length);
    expect(rows).toHaveLength(4);


    let memoryMb = '';   

    for(const row of rows)
    {
        const processName = await row.locator('td').nth(0).innerText();

        if(processName === 'Firefox')
        {
            memoryMb = await row.locator('td',{hasText: /MB$/}).innerText();
            console.log('Memory Size of Firefox Process: ', memoryMb);
            break;
        }
    }


    //Compare to Firefox Memory Below the Table

    let firefoxMemory = await page.locator('.firefox-memory').innerText();

    if(firefoxMemory.includes(memoryMb))
    {
        console.log("They are Equal");
    }
    else{
        console.log('They Are not Equal')
    }

    expect(firefoxMemory).toContain(memoryMb);

    await page.waitForTimeout(5000);

 });

 test('Verify Network Speed of Chrome process', async({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/')


    const table = page.locator('#taskTable tbody');
    await expect (table).toBeVisible();

    const rows = await table.locator('tr').all();
    console.log("number of rows in the table: ", rows.length);
    expect(rows).toHaveLength(4);

    let NetworkSpeed = '';

     for(const row of rows)
    {
        const processName = await row.locator('td').nth(0).innerText();

        if(processName === 'Chrome')
        {
            NetworkSpeed = await row.locator('td',{hasText: 'Mbps'}).innerText();
            console.log('Network Speed of Chrome Process: ', NetworkSpeed);
            break;
        }
    }

    await page.waitForTimeout(5000);
 });

 test('Verify Disk Space of Firefox Process', async({page}) => {


     await page.goto('https://testautomationpractice.blogspot.com/')


    const table = page.locator('#taskTable tbody');
    await expect (table).toBeVisible();

    const rows = await table.locator('tr').all();
    console.log("number of rows in the table: ", rows.length);
    expect(rows).toHaveLength(4);

    let diskSpace = '';

    for(const row of rows)
    {
        const processName = await row.locator('td').nth(0).innerText();

        if(processName === 'Firefox')
        {
            diskSpace = await row.locator('td',{hasText:'MB/s'}).innerText();
            console.log('Disk SPace of Firsfeox Process: ', diskSpace);
            break;
        }
    }
    await page.waitForTimeout(5000);

    //compares the retrieved data
    let firefoxSpace = await page.locator('.firefox-disk').innerText();

    if(firefoxSpace.includes(diskSpace))
    {
        console.log('They are equal...')
    }
    else{
        console.log('They are not equal...')
    }


    expect(firefoxSpace).toContain(diskSpace);
    await page.waitForTimeout(5000);

 });