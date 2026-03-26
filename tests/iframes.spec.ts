
import {test, expect} from '@playwright/test'


test('Frames Demo', async({page}) => {


    await page.goto('https://ui.vision/demo/webtest/frames/');


   const frames = page.frames();

   console.log('frames founded:',frames.length);

   /*
    //approach 1: Using page.frame()
   const frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html"});

   if(frame)
   {
        await frame.locator("[name='mytext1']").fill('Hello');
        //await frame.fill("[name='mytext1']", 'Hello');
   }
   else{
        console.log("Frame is not Available");
   }
    */

   //Approach 2: Using Framelocator()

   const inputBox =  page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");

   await inputBox.fill('Hello World');
   await expect (inputBox).toHaveValue('Hello World');

   await page.waitForTimeout(5000);

});

test('Inner/child Frames', async ({page}) => {
            
    await page.goto('https://ui.vision/demo/webtest/frames/');


    const frame3 = page.frame({ url:'https://ui.vision/demo/webtest/frames/frame_3.html'});

    if(frame3)
    {
        await frame3.locator("[name='mytext3']").fill("Welcome");//fill text inside frame
        const childFrame = frame3.childFrames(); //variable that handles the iframe
        console.log('childFrame Found: ', childFrame.length); //identifies how many iframes
        const radio = childFrame[0].getByLabel('I am a human'); //Locate element
        await radio.click()//clicks the checkbox
        await expect(radio).toBeChecked();//assertion

    }
    else{
        
        console.log('Frame not Found...')
    }
    
    await page.waitForTimeout(5000);

});

test('Verify frame 2 Functionality', async({page}) =>{

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame2 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_2.html'});

    if(frame2)
    {
        await frame2.locator("[name='mytext2']").fill('Hello Guys');
        const childframe1 = frame2.childFrames();
        console.log('Childframes found: ', childframe1.length);
    }
    else{
        console.log('Frame not Found...');
    }
});

test('Verify frame 4 Functionality', async({page}) =>{

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const inputField = page.frameLocator('[src="frame_4.html"]').locator('[name="mytext4"]');
    await inputField.fill('hello guuuys');
    await expect(inputField).toHaveValue('hello guuuys');

    const frame4 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_4.html"});
    if(frame4)
    {
        const childframe4 = frame4.childFrames();
        console.log('iframes found: ',childframe4.length);
    }
    else{
        console.log('Frames not Found...');
    }

    await page.waitForTimeout(5000);
});

test('verify Frame 5 Functionality', async({page}) =>{

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame5 = page.frameLocator('[src="frame_5.html"]');
    
    const textbox = frame5.locator('[name="mytext5"]');

    await textbox.fill('hello world');
    await expect(textbox).toHaveValue('hello world');

  
    const frameContent =  frame5.getByRole('link', { name: 'https://a9t9.com' });
    await frameContent.click();
    
    await expect(page.locator('frame').nth(4).contentFrame().getByRole('link', { name: 'Ui.Vision by a9t9 software -' })).toBeVisible();
    
    await page.waitForTimeout(5000);
    
});

