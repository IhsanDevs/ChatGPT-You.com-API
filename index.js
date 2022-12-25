/**
 *  Create express API server for building a REST API
 * for chatbot with using url server https://you.com/api/youchatStreaming.
 * url server have 2 params: question and chat. params question is a string
 * and chat is encoded JSON with have array containing object with 2 params:
 * question and answer. question is a string and answer is a string.
 *
 *  Server will return a event stream with using SSE (Server-Sent Events).Each event will have
 * a data param with a JSON data. If JSON data contain a param with name "token", join the
 * value of this param to the each event data param with name "token".
 *
 * @author: Ihsan Devs
 * @version: 1.0.0
 * @license: MIT
 * @link: https://ihsandevs.com
 */
const express = require("express");
const app = express();
const port = 3000;
const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");
const showdown = require("showdown");
const converter = new showdown.Converter();
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

let url = "https://you.com/api/youchatStreaming";

app.get("/", async (req, res) => {
  // get question param from url
  let question = req.query.question;

  // check if question param is not empty
  if (question == undefined || question.length == 0) {
    res.json({
      error: "question param is empty",
    });
    return;
  }

  // get chats param from chats.json file
  let fs = require("fs");
  let chats = JSON.parse(fs.readFileSync("chats.json"));
  let chat = JSON.stringify(chats);

  // message to send
  let message = "";
  // puppeteer usage as normal
  puppeteer
    .launch({ headless: true, executablePath: executablePath() })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page
        .goto(url + "?question=" + question + "&chat=" + chat)
        .then(async () => {
          await page.waitForSelector("body");
          const bodyHTML = await page.evaluate(() => document.body.innerHTML);

          // get plain text from body
          let text = bodyHTML.replace(/<[^>]*>?/gm, "");

          // explode text to array by new double line
          let textArray = text.split("\n\n");

          // remove first element from array
          textArray.shift();

          // push each element to dataToken array
          textArray.forEach(async (element) => {
            // explode element to array by new line with pushing to dataToken array with key "event" and "data"
            let elementArray = element.split("\n");

            try {
              const event = elementArray[0].replace("event: ", "");
              const data = elementArray[1].replace("data: ", "");

              if (event == "token") {
                // convert JSON string to JSON object from data param
                let dataObject = JSON.parse(data);
                // join token value to message
                message += dataObject.token;
              } else if (event == "done") {
                await browser.close();
              }
            } catch (error) {
              //
            }
          });

          // send message to client
          res.json({
            markdown: message,
            html: converter.makeHtml(message),
          });

          // save question and answer to file chats.json
          let fs = require("fs");
          let chats = JSON.parse(fs.readFileSync("chats.json"));
          chats.push({
            question: question,
            answer: message,
          });
          fs.writeFileSync("chats.json", JSON.stringify(chats));
        });
    });
});

app.get("/histories", async (req, res) => {
  // get chats param from chats.json file
  let fs = require("fs");
  let chats = JSON.parse(fs.readFileSync("chats.json"));
  let chat = JSON.stringify(chats);
  let html = "";

  // join each answer to html
  chats.forEach((element) => {
    html += converter.makeHtml(element.answer);
  });

  // send html to client
  res.send(html);
});
app.listen(port, () => console.log(`ChatBOT listening on port ${port}!`));
