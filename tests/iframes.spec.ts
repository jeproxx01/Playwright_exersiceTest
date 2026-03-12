
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

test.only('Inner/child Frames', async ({page}) => {
            
    await page.goto('https://ui.vision/demo/webtest/frames/');


    const frame3 = page.frame({ url:'https://ui.vision/demo/webtest/frames/frame_3.html'});

    if(frame3)
    {
        await frame3.locator("[name='mytext3']").fill("Welcome");//fill text inside frame
        const childFrame = frame3.childFrames(); //variable that handles the iframe
        console.log('childFrame Found: ', childFrame.length); //identifies how many iframes
        const radio = childFrame[0].getByLabel('I am a human'); //Locate element
        await radio.check()//checks the checkbox
        await expect(radio).toBeChecked();//assertion

    }
    else{
        
        console.log('Frame not Found...')
    }
    
    await page.waitForTimeout(5000);

});


