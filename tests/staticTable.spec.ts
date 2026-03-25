import {test, expect} from "@playwright/test"


test('Static Table', async({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator('table[name="BookTable"] tbody');   
    await expect(table).toBeVisible();

    const rows = table.locator('tr'); //chaining of locator  
    await expect(rows).toHaveCount(7); //first approach

    const count = await rows.count();
    console.log('number of rows in a table: ', count);
    expect(count).toBe(7); //approach 2

    //2. count number of header/columns

    const columns = rows.locator("th");
    await expect (columns).toHaveCount(4); //4

    const columnCount = await columns.count();
    console.log("number of columns: ", columnCount);
    expect(columnCount).toBe(4);

    //3. Print the 2nd row
    const secondCells = rows.nth(2).locator('td');

    const secondRowtext = await secondCells.allInnerTexts();
    console.log("2nd Row Data: ", secondRowtext); //['Learn Java', 'Mukesh', 'Java', '500']

    await expect(secondCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500'])

    for(let text of secondRowtext)
    {
        console.log(text);
    }

    //4. Read all the data in the Table (excluding the Header)

    console.log("Printing all Data....");

    const allRowsData = await rows.all(); //get all Row Locator //converting the locator into array

    for(let row of allRowsData.slice(1))
    {
        const cols = await row.locator('td').allInnerTexts();
        console.log(cols);
    }

    //5. Print book names where author is Mukesh

    const mukeshBooks = [];
    for(let row of allRowsData.slice(1))
    {
        const cells = await row.locator('td').allInnerTexts();
        const author =cells[1];
        const book = cells[0];

        if(author === "Mukesh")
        {
            console.log(`${author}, \t ${book}`);
            mukeshBooks.push(book);
        }

    }

    expect(mukeshBooks).toHaveLength(2);

    //6. Calculate the Total Price of all books
    let totalPrice = 0;

     for(let row of allRowsData.slice(1))
    {
        const cells = await row.locator('td').allInnerTexts();
        const price =cells[3];

        totalPrice = totalPrice+parseInt(price);
    }

        console.log("Total Price: ",totalPrice);
        
        expect(totalPrice).toBe(7100);
});