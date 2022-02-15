const axios = require("axios");
const fs = require("fs");
const schedule = require("node-schedule");

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

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();


// US Inflation Data 4.30PM Bahrain Time Tue 15th
const date1 = new Date(2022, 1, 15, 14, 20, 0);

// US Retail Sales 4.30PM Bahrain Time Wed 16th
const date2 = new Date(2022, 1, 16, 14, 20, 0);

// FOMC Minutes 10PM Bahrain Time Wed 16th
const date3 = new Date(2022, 1, 16, 19, 50, 0);







// const date4 = new Date(2022, 1, 6, 23, 19, 0);
// const date5 = new Date(2022, 1, 7, 00, 15, 0);

schedule.scheduleJob(date1, () => {
  client
    .sendMessage(
      "97338999888@c.us",
      "Trigger 4.20PM BH Time - 6.20AM TUC Time\n\n*Alert*\n\nUS Inflation Data announcement in 10 mins (At 4.30pm BH Time).\n\nGold price is expected to move."
    )
    .then((res) => {
      console.log("SENT");
    })
    .catch((err) => {
      console.log("ERROR");
    });
});


schedule.scheduleJob(date2, () => {
  client
    .sendMessage(
      "97338999888@c.us",
      "*Alert*\n\nUS Retail Sales Data in 10 mins (At 4.30pm BH Time).\n\nGold price is expected to move."
    )
    .then((res) => {
      console.log("SENT");
    })
    .catch((err) => {
      console.log("ERROR");
    });
});


schedule.scheduleJob(date3, () => {
  client
    .sendMessage(
      "97338999888@c.us",
      "*Alert*\n\nUS Federal Reserve Interest Rate Announcement in 10 mins (At 10pm BH Time).\n\nGold price is expected to move."
    )
    .then((res) => {
      console.log("SENT");
    })
    .catch((err) => {
      console.log("ERROR");
    });
});



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
  let resp = await axios.get(qabBuilder(range));
  return resp.data.values;
}


async function goldPrice() {
  let resp = await axios.get("https://www.goldapi.io/api/XAU/USD", { 'headers': { 'x-access-token': "goldapi-9o7ltkznhulqi-io" } });
  return resp.data.price;
}


async function goldPriceStats() {
  let resp = await axios.get("https://www.goldapi.io/api/stat", { 'headers': { 'x-access-token': "goldapi-9o7ltkznhulqi-io" } });
  return resp.data;
}

async function goldAPIStatus() {
  let resp = await axios.get("https://www.goldapi.io/api/status", { 'headers': { 'x-access-token': "goldapi-9o7ltkznhulqi-io" } });
  return resp.data.result;
}



function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getQuantity(msg) {

  if (msg.slice(6,7) === " ") {
    return parseInt(msg.slice(5,6));
  } else {
    return parseInt(msg.slice(5,7)); 
  }
  
}

// ----------------- HELP START -----------------
// client.on("message", (message) => {
//     if (message.body === "!help") {

//         message.reply("*COMMANDS:* \r\n\r\n\
//         `*!mss sell*` (MSS SELL POSITIONS)\n\
//         `*!mss sell*` (MSS BUY POSITIONS)\n\
//         `*!kenz sell*` (KENZ SELL POSITIONS)\n\
//         `*!kenz buy*` (KENZ BUY POSITIONS)\n\
//         `*!qab sell*` (QAB SELL POSITIONS)\n\
//         `*!qab buy*` (QAB BUY POSITIONS)");
//     }
//   });

// ----------------- HELP END -----------------

// ----------------- MSS START -----------------

// client.on("message", (message) => {
//     if (message.body === "!mss buy") {
//       mssGrab(buyRange).then((data) =>
//         message.reply(`*MSS BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );

//     }
//   });

//   client.on("message", (message) => {
//     if (message.body === "!mss sell") {
//       mssGrab(sellRange).then((data) =>
//         message.reply(`*MSS SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );
//     }
//   });

// ----------------- MSS END -----------------

// ----------------- FIXING -----------------

client.on("message", (message) => {
  if (message.body === "!price") {
    goldPrice().then((price) => {
      message.reply(`Current Price: $${price}`);
    });
  }


  if (message.body === "!tt") {
    goldPrice().then((price) => {
      const ttRate = price*1.417;
      const ttPrice = Math.ceil(ttRate) + 5;

      message.reply(`Current TT Rate: BD${ttPrice}`);
    });
  }


  if (message.body === "!book") {

    goldPrice().then((price) => {
      const ttRate = price*1.417;
      const ttPrice = Math.ceil(ttRate) + 5;

      message.reply(
        `BD${ttPrice} per TT.\n\nPlease type **!fix X TT** where X is your quantity in numbers.\n\nSo to fix 2 tt you will type **!fix 2 TT**`
      );
    });
   
  }

  if (message.body.includes("!fix")) {

    if (message.body.length < 5) {
      message.reply(`Error.\n\nPlease type *!fix X TT* where X is your quantity in numbers.\n
      \nSo to fix 2 tt you will type **!fix 2 TT**\n\nOr to fix 5 tt you will type *!fix 5 TT*`);
    } else {

      const quantity = getQuantity(message.body);

      goldPrice().then((price) => {
        const ttRate = price*1.417;
        const ttPrice = Math.ceil(ttRate) + 5;

        const totalPrice = quantity * ttPrice;
        const totalPriceFormatted = numberWithCommas(totalPrice);

        client
        .sendMessage("120363041665012059@g.us", `Buy ${quantity} TT on screen.`)
        .then((res) => {
          console.log("GROUP SENT");
        })
        .catch((err) => {
          console.log("ERROR");
        }); 

        message.reply(
          `${quantity} TT Bars Booked at BD${ttPrice} each.\n\nTotal = BD${totalPriceFormatted}\n\n*This message is your confirmation and proof of booking.*\n\nThank you.`
        );


      })// end of goldPrice
      
      
    } // end of else 

  } // end of !fix if statement

  if (message.body.includes("!stats")) {

    goldPriceStats().then((stat) => { 

      message.reply(
        `Reqs Today: ${stat.requests_today}\n\nReqs Yesterday: ${stat.requests_yesterday}\n\nReqs Month: ${stat.requests_month}\n\nReqs Last Month: ${stat.requests_last_month}`
      );
    })

  }


  if (message.body.includes("!gstatus")) {

    goldAPIStatus().then((status) => { 
      message.reply(`${status}`);
    })

  }
});

// ----------------- END -----------------

// ----------------- KENZ START -----------------

// client.on("message", (message) => {
//     if (message.body === "!kenz buy") {
//       kenzGrab(buyRange).then((data) =>
//         message.reply(`*KENZ BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );
//     }
//   });

//   client.on("message", (message) => {
//     if (message.body === "!kenz sell") {
//       kenzGrab(sellRange).then((data) =>
//         message.reply(`*KENZ SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );
//     }
//   });

// ----------------- KENZ END -----------------

// ----------------- QAB START -----------------

// client.on("message", (message) => {
//     if (message.body === "!qab buy") {
//       qabGrab(qabBuyRange).then((data) =>
//         message.reply(`*QAB BUY POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );
//     }
//   });

//   client.on("message", (message) => {
//     if (message.body === "!qab sell") {
//       qabGrab(qabSellRange).then((data) =>
//         message.reply(`*QAB SELL POSITIONS* \r\n\r\n${data.join("\r\n")}`)
//       );
//     }
//   });

// ----------------- QAB END -----------------
