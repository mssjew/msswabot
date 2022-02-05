const axios = require("axios");
const fs = require("fs");
const schedule = require('node-schedule');

const internalPos = "Summary!C3";
const sellRange = "Summary!B11:B38";
const buyRange = "Summary!C11:C38";

const qabSellRange = "Summary!B11:B28";
const qabBuyRange = "Summary!C11:C28";

const qrcode = require("qrcode-terminal");

const { Client, Buttons } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData,
});

client.on("authenticated", (session) => {
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

let button = new Buttons("Test", 
[{body: "!mss sell", id: "id_btn1"},
{body: "!mss buy", id: "id_btn2"},
{body: "!mss profit", id: "id_btn3"}], "Choose Report", "Test");



client.on("ready", () => {
  console.log("Client is ready!");

  schedule.scheduleJob('12 * * * * *', () => {
    client.sendMessage("97338999888@c.us", "YOOO").then(res => {
      console.log('MESSAGE SENT');
      }).catch((err) => {
        console.log('ERROR');
      });
  });
});

client.initialize();




client.on("message", (message) => {
  console.log(message.body);
});

function mssBuilder(range) {
  return `https://sheets.googleapis.com/v4/spreadsheets/1OJaJ-yJX6vDt6PtUcw4KK5T59JKYAAd4j0NkZext6Jo/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
}

function kenzBuilder(range) {
  return `https://sheets.googleapis.com/v4/spreadsheets/1_gYW1JXBL5Wqc-e--AHZ_Zgw56p132E858mJ1_v5Uzk/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
}

function qabBuilder(range) {
  return `https://sheets.googleapis.com/v4/spreadsheets/17eTp9cHVcdfu936Kt9feSPHUonicWm6RSvWeVLK2-zA/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
}

async function mssGrab(range) {
  let resp = await axios.get(mssBuilder(range));
  return resp.data.values;
}

async function kenzGrab(range) {
  let resp = await axios.get(kenzBuilder(range));
  return resp.data.values;
}

async function qabGrab(range) {
  let resp = await axios.get(kenzBuilder(range));
  return resp.data.values;
}

// ----------------- HELP START ----------------- 
client.on("message", (message) => {
    if (message.body === "!help") {

        message.reply("*COMMANDS:* \r\n\r\n\
        `*!mss sell*` (MSS SELL POSITIONS)\n\
        `*!mss sell*` (MSS BUY POSITIONS)\n\
        `*!kenz sell*` (KENZ SELL POSITIONS)\n\
        `*!kenz buy*` (KENZ BUY POSITIONS)\n\
        `*!qab sell*` (QAB SELL POSITIONS)\n\
        `*!qab buy*` (QAB BUY POSITIONS)");
    }
  });

// ----------------- HELP END -----------------







// ----------------- MSS START -----------------

client.on("message", (message) => {
    if (message.body === "!mss buy") {
      mssGrab(buyRange).then((data) =>
        message.reply(`*MSS BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );

    }
  });
  
  client.on("message", (message) => {
    if (message.body === "!mss sell") {
      mssGrab(sellRange).then((data) =>
        message.reply(`*MSS SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  
// ----------------- MSS END -----------------

// ----------------- KENZ START -----------------

client.on("message", (message) => {
    if (message.body === "!kenz buy") {
      kenzGrab(buyRange).then((data) =>
        message.reply(`*KENZ BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  
  client.on("message", (message) => {
    if (message.body === "!kenz sell") {
      kenzGrab(sellRange).then((data) =>
        message.reply(`*KENZ SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  

// ----------------- KENZ END -----------------

// ----------------- QAB START -----------------

client.on("message", (message) => {
    if (message.body === "!qab buy") {
      qabGrab(qabBuyRange).then((data) =>
        message.reply(`*QAB BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  
  client.on("message", (message) => {
    if (message.body === "!qab sell") {
      qabGrab(qabSellRange).then((data) =>
        message.reply(`*QAB SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
      );
    }
  });
  

// ----------------- QAB END -----------------
