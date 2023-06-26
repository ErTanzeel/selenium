const { By, Builder } = require("selenium-webdriver");
const readline = require('readline');
const fs = require('fs')

async function PaytmProj() {

    // Creates new driver to automate the chrome browser
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize()

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

    //for clicking login button
    await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div/a')).click();
    await driver.sleep(3000);

    //for giving mobile number and click get otp button 
    await driver.switchTo().frame(0)
    await driver.sleep(3000);

    await driver.findElement(By.xpath('//*[@id="app"]/div/div/div/span/div/div/div[2]/span/a')).click(); //click on scanner button

    
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

// code for going  parent window 
    const parentWindow = driver.getWindowHandle();

    await driver.switchTo().window(parentWindow);

    await driver.sleep(2000);
    await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div/div[1]')).click();//Mr
    await driver.findElement(By.xpath('//*[@id="text-box"]')).sendKeys('Tanzeel'); //first name input
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[3]/div[1]/div[4]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div[2]/div/input')).sendKeys('hasan');
    await driver.sleep(2000);

    await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div[3]/div/button')).click(); //continue button
    await driver.findElement(By.xpath('//*[@id="flights-review-ancillary"]/div[2]/div/div[1]/div/div[2]/div[1]/div[2]/span')).click();


    await driver.sleep(2000)
    let meals = await driver.findElements(By.className('_2AV5'));
    await driver.sleep(2000)

    //function for fetch the all meal
    await Promise.all(meals.map(async (meal) => {
        let fetch_meal = await meal.getText()
        console.log(fetch_meal);
    }))

    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screen1.png', screenshot, 'base64')
 
}
PaytmProj()