
import {test, expect} from '@playwright/test'


test('Frames Demo', async({page}) => {


    await page.goto('https://ui.vision/demo/webtest/frames/');


   const frames = page.frames();

   console.log('frames founded:',frames.length);

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


   //Approach 2: Using Framelocator()

   const inputBox =  page.frameLocator("[src='frame_3.html']").locator("[name='mytext3']");

   inputBox.fill('Hello World');
   await expect (inputBox).toHaveValue('Hello World');

   await page.waitForTimeout(5000);

});




