import {test, expect, Locator} from '@playwright/test'




test('Text Input Actions', async ({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    const textBox: Locator = page.locator('#name');

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxLength: string | null = await textBox.getAttribute("maxlength"); //returns value of max length of the element
    expect(maxLength).toBe('15');

    await textBox.fill('Jeproxx Cesar');

    console.log('text content of the firstname: ', await textBox.textContent());//returns empty

    const enteredValue: string = await textBox.inputValue();
    console.log("Input Value of the First Name: ", enteredValue); //returns the input value of the textbox

    expect(enteredValue).toBe("Jeproxx Cesar");

    const nEmail: Locator = page.locator('#email');

    await (nEmail).fill('Jeffrey@gmail.com');
    

});


test('Radio Button Actions', async ({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    const maleRadio: Locator = page.locator('#male');

    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    expect (await maleRadio.isChecked()).toBe(false);

    await maleRadio.check();
    //expect (await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked();

});

    test('Checkbox Actions', async ({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    //1.select specific checkbox (sunday)
    //const sundayCheckbox: Locator = page.getByLabel('Sunday');
    //await sundayCheckbox.check();
    //await expect(sundayCheckbox).toBeChecked();

    //2.select all checkbox and assert each is checked 

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    //3. Check the checkbox and Assert
  /*  for (const checkbox of checkboxes)

        {
           await checkbox.check();
           await expect(checkbox).toBeChecked();
        }
    

    //4.Uncheck the last 3 checkbox and Assert
    for (const checkbox of checkboxes.slice(-3)) // (3)checkboxes will be captured from the last of the array

        {
           await checkbox.uncheck();
           await expect(checkbox).not.toBeChecked();
        }

        //5. toggle Checkboxes: If checked, Unchecked. if Uncheck, checked. assert state flipped.

        for(const checkbox of checkboxes)
            
           { 

            if( await checkbox.isChecked())
           
            {

                await checkbox.uncheck();
                await expect(checkbox).not.toBeChecked();

            }
            else{

                await checkbox.check();
                await expect(checkbox).toBeChecked();

        }

    }
    */    //Randomly check the checkboxes and assert 
    const indexes =[1,3,6];

    for(const i of indexes)
    {
        await checkboxes[i].check();
        await expect (checkboxes[i]).toBeChecked();
    }

    await page.waitForTimeout(5000);


    //Select the checkbox based on the label

     
     
});


