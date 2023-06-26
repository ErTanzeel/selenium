const { By, Builder } = require("selenium-webdriver");
const readline = require('readline');

async function PaytmProj() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize()

    try {

        // Creates new driver to automate the chrome browser

        // go to the page 
        await driver.get("https://tickets.paytm.com/flights/");

        //select the from inputbox 
        let inp = driver.findElement(By.id('text-box'));
        await inp.click()
        // code for clicking  departure city 
        await driver.findElement(By.xpath('//*[@id="flightsBookingForm"]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div[1]/div[2]')).click();

        //select the To inputbox
        let inp1 = driver.findElement(By.xpath("(//input[@id='text-box'])[2]"));
        await inp1.click()
        // Code for clicking destination city
        await driver.findElement(By.xpath('//*[@id="flightsBookingForm"]/div[2]/div[4]/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div[2]')).click();

        //  code for clicking departure date box and adding Departure date
        await driver.findElement(By.xpath("//input[@name='Departure-Date']")).click();
        await driver.findElement(By.xpath("(//div[contains(text(),'30')])[1]")).click();

        // code for clicking Search button
        await driver.findElement(By.xpath("(//button[normalize-space()='Search'])[1]")).click();
        await driver.sleep(5000)

        // code for clicking on book button
        await driver.findElement(By.xpath("(//a[@class='NEGf'][normalize-space()='Book'])[7]")).click();

        // for going to next window
        let login = await driver.getAllWindowHandles();
        await driver.switchTo().window((login[1]));

        await driver.findElement(By.xpath("//button[normalize-space()='Continue']")).click();// continue
        await driver.findElement(By.xpath("//a[contains(text(),'Login to continue →')]")).click(); //for clicking login button
        await driver.sleep(3000);

        await driver.switchTo().frame(0)
        await driver.sleep(3000);

        await driver.findElement(By.xpath('//*[@id="app"]/div/div/div/span/div/div/div[2]/span/a')).click(); //click on scanner button
        await driver.sleep(10000);

        /*    
            await driver.findElement(By.xpath('//*[@id="email_mobile_login"]')).sendKeys('7004878199');
            await driver.findElement(By.xpath('//*[@id="app"]/div/div/div/form/div[2]/div/div/button')).click();
        
        
            // Create a new readline interface
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        
            let a
            await driver.sleep(15000);
            rl.question('Enter your input: ', (userInput) => {
                // Find the input element
                driver.findElement(By.xpath('//*[@id="otp_login"]'))
                    .then(inputElement => {
                        // Set the value of the input element to the user input
                        a = userInput
                        inputElement.sendKeys(userInput);
        
                    })
        
            })
            await driver.sleep(20000);
            console.log(a)
            driver.findElement(By.xpath("//*[@id=\"app\"]/div/div/form/div[2]/button")).click(); //verify 
        
        */
        // code for going  parent window 
        // const parentWindow = driver.getWindowHandle();
      //  await driver.findElement(By.className('info')).click();
        
        await driver.switchTo().defaultContent()

        await driver.sleep(5000)

        await driver.findElement(By.xpath("(//div[@class='_2OWI'])[1]")).click(); //checkbx

        await driver.sleep(3000);

        await driver.findElement(By.xpath("//div[@id='add-new-traveller-adult']")).click(); //add adult


        await driver.findElement(By.xpath("//div[normalize-space()='Mr']")).click();
        await driver.sleep(3000);
        await driver.findElement(By.xpath("(//input[@id='text-box'])[1]")).sendKeys('Tanzeel')
        await driver.sleep(3000);
        await driver.findElement(By.xpath("(//input[@id='text-box'])[2]")).sendKeys('Hasan')
        await driver.sleep(3000);

        await driver.findElement(By.xpath("(//div[@class='_30OB'])[1]")).click(); //done btn
        await driver.sleep(3000)

        await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div[3]/div/button')).click()
        await driver.findElement(By.xpath('//*[@id="flights-review-ancillary"]/div[2]/div/div[1]/div/div[2]/div[1]')).click();

        await driver.sleep(2000)
        let meals = await driver.findElements(By.className('_2AV5'));
        await driver.sleep(5000)
        await Promise.all(meals.map(async (meal) => {
            let res = await meal.getText()
            console.log(res);
        }))

        await driver.findElement(By.xpath("(//img[@class='_3Vhc'])[13]")).click(); //select meal
        await driver.sleep(3000);

        await driver.findElement(By.xpath("(//div[@class='_2NM9'])[5]")).click();   //seat dropdown
        await driver.sleep(3000);

        await driver.findElement(By.xpath("(//img[@alt='seat'])[71]")).click();  //select seat
        await driver.sleep(3000);

        await driver.executeScript("window.scrollTo(0,400)");
        await driver.findElement(By.xpath("//div[@class='N9Zv']//div//div//div[@class='_2jhJ'][contains(text(),'Proceed to Pay ₹ 7,784')]")).click(); //proceed to pay btn
        await driver.sleep(10000);

    

    } catch (error) {
        console.log(error)
    }
    finally {

        await driver.quit();

    }

}
PaytmProj()
