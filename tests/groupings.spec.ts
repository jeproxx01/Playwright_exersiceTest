import {test, expect} from '@playwright/test'



test.describe('Group1', async() =>{


    test('Test1', async () => {

        console.log("this is Test 1...")
    });

    test('Test2', async () => {

        console.log("this is Test 2...")
    });

});



test.describe('Group2', async() =>{


    test('Test 3', async () => {

        console.log("this is Test 3...")
    });

    test('Test 4', async () => {

        console.log("this is Test 4...")
    });

});