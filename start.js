const puppeteer = require("puppeteer");

const fs = require('fs');
const readline = require('readline');


let openLink = async()=>{
const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      "--start-maximized",
      "--unlimited-storage",
      "--full-memory-crash-report",
      "--disable-dev-shm-usage",
      "--disable-web-security"
    ]
  });
const page = await browser.newPage();

const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

for await (const line of rl) {
 
    for (let i = 0; i < 3; i++) {
        try{
            let url = "https://"+ line;
            console.log(`connecting  ${url}`);

            await page.goto(url, {
                timeout: 60000,
                waitUntil: "domcontentloaded"
            });
        
            await sleep(2000)
        }catch (e) {
            console.log(e.message);

            let url = "http://"+ line;
            console.log(`connecting  ${url}`);

            await page.goto(url, {
                timeout: 60000,
                waitUntil: "domcontentloaded"
            });
        
            await sleep(2000)
        }
    }
}

browser.close();


}



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

openLink();
