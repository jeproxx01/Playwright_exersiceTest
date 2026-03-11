import {test, expect, Locator} from '@playwright/test'



    test('Form Input', async ({page}) => {


        await page.goto('https://testautomationpractice.blogspot.com/');
        await expect(page).toHaveTitle(/Automation Test/);


       const nameInput = page.locator('#name');
       const emailInput = page.locator('#email');

       await (nameInput).fill('Jeproxx Cesar');
       await (emailInput).fill('Jeff@gmail.com');

       await expect(nameInput).toHaveValue('Jeproxx Cesar');
       await expect(emailInput).toHaveValue('Jeff@gmail.com');

        //radio
        const maleRadio = page.locator('input[value="male"]');
        await maleRadio.check();

        await expect(maleRadio).toBeChecked();

        //Checkbox
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const checkboxes: Locator[] = days.map(day => page.getByLabel(day));
        expect (checkboxes.length).toBe(7);

        /*
        //Manual way
        await checkboxes[0].check();
        await expect(checkboxes[0]).toBeChecked();

        await checkboxes[1].check();
        await expect(checkboxes[1]).toBeChecked();

        await checkboxes[2].check();
        await expect(checkboxes[2]).toBeChecked();

        await page.waitForTimeout(5000);
        */
        

        //Using For Loop
        const indexes = [0,1,2];


    for(const i of indexes)
        {
            await checkboxes[i].check();
            await expect(checkboxes[i]).toBeChecked();
        }


        await page.waitForTimeout(5000);

    });


    test('Dropdown', async({page}) => {


        await page.goto('https://testautomationpractice.blogspot.com/');
        await expect(page).toHaveTitle(/Automation Test/);


        //const countryList = page.getByLabel('Country'); //flaky

        const countryList = page.locator('#country');
        await countryList.selectOption('Canada');
        await expect(countryList).toHaveValue('canada');
        await expect (countryList).toContainText('Canada');

        
        const colorlist = page.getByLabel('Colors');
        await colorlist.selectOption('Blue');
        await expect (colorlist).toHaveValues(['blue']);
        
        await page.waitForTimeout(5000);

    });

    test('Handling Alerts', async ({page}) => {

        await page.goto('https://testautomationpractice.blogspot.com/');
        await expect(page).toHaveTitle(/Automation Test/);

        //register a dialog Handler

        page.on('dialog', (dialog) => {

            console.log("Dialog type is: ",dialog.type()); //returns the type of the dialog
            expect(dialog.type()).toContain('alert');
            console.log("Dialog Text: ",dialog.message()); //returns the message from dialog
            expect(dialog.message()).toContain('I am an alert box!');


        dialog.accept();
        });

        await page.locator("#alertBtn").click();
        
        await page.waitForTimeout(5000);

    });


     test('Confirmation Dialog', async ({page}) => {

        await page.goto('https://testautomationpractice.blogspot.com/');
        await expect(page).toHaveTitle(/Automation Test/);

        //register a dialog Handler

        page.on('dialog', (dialog) => {

            console.log("Dialog type is: ",dialog.type()); //returns the type of the dialog
            expect(dialog.type()).toContain('confirm');
            console.log("Dialog Text: ",dialog.message()); //returns the message from dialog
            expect(dialog.message()).toContain('Press a button!');

            //dialog.accept();//close dialog by accepting
            dialog.dismiss();//close dialog by dismissing
        });

        await page.locator("#confirmBtn").click();

        const text = await page.locator('#demo').innerText();
        console.log("Output text: ", text);
        await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
        //await expect(page.locator("#demo")).toHaveText("You pressed OK!");
        
        await page.waitForTimeout(5000);

    });


    test.only('Prompt Alert', async ({page}) => {

        await page.goto('https://testautomationpractice.blogspot.com/');
        await expect(page).toHaveTitle(/Automation Test/);

        //register a dialog Handler

        page.on('dialog', (dialog) => {

            console.log("Dialog type is: ",dialog.type()); //returns the type of the dialog
            expect(dialog.type()).toContain('prompt');
            console.log("Dialog Text: ",dialog.message()); //returns the message from dialog
            expect(dialog.message()).toContain("Please enter your name:");
            expect (dialog.defaultValue()).toContain("Harry Potter"); //checks the defaultValue

            dialog.accept('John');//close dialog by accepting
            
        });

        await page.locator("#promptBtn").click();

        const text = await page.locator('#demo').innerText();
        console.log("Output Text: ", text);

        await expect(page.locator("#demo")).toContainText("Hello John! How are you today?");

        
        await page.waitForTimeout(5000);
    });