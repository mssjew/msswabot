const axios = require("axios");
const fs = require('fs');

const internalPos = "Summary!C3";
const sellRange = "Summary!B11:B38";
const buyRange = "Summary!C11:C38";

const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");

const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });



client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("message", (message) => {
  console.log(message.body);
});

// ----------------- MSS START ----------------- 

async function sellMSS() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/1OJaJ-yJX6vDt6PtUcw4KK5T59JKYAAd4j0NkZext6Jo/values/${sellRange}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
  let resp = await axios.get(url);
  return resp.data.values;
}

async function buyMSS() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/1OJaJ-yJX6vDt6PtUcw4KK5T59JKYAAd4j0NkZext6Jo/values/${buyRange}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
  let resp = await axios.get(url);
  return resp.data.values;
}

client.on("message", (message) => {
  if (message.body === "!mss sell") {
    sellMSS().then((data) =>
      message.reply(`*MSS SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
    );
  }
});

client.on("message", (message) => {
  if (message.body === "!mss buy") {
    buyMSS().then((data) =>
      message.reply(`*MSS BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
    );
  }
});


client.on("message", (message) => {
    if (message.body === "!mss full") {
      buyMSS().then((data) =>
        message.reply(`*MSS FULL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  
// ----------------- MSS END ----------------- 


// ----------------- KENZ START ----------------- 

// ----------------- KENZ END ----------------- 


// ----------------- QAB START ----------------- 

// ----------------- QAB END ----------------- 