const axios = require("axios");
const fs = require("fs");
const schedule = require("node-schedule");
var emoji = require("node-emoji");


const greenTickEmoji = emoji.get("white_check_mark");
const redXEmoji = emoji.get("x");

const internalPos = "Summary!C3";
const sellRange = "Summary!B11:B38";
const buyRange = "Summary!C11:C38";

const qabSellRange = "Summary!B11:B28";
const qabBuyRange = "Summary!C11:C28";

const qrcode = require("qrcode-terminal");
const { L } = require("qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel");

const { Client, Buttons } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";

let TT_PREMIUM = 5;


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


// US Inflation Data 4.30PM Bahrain Time Fri 25th
const date1 = new Date(2022, 1, 25, 07, 20, 07);



const date2 = new Date(2022, 1, 25, 14, 20, 01);


schedule.scheduleJob(date1, () => {
  client
    .sendMessage(
      "97338999888@c.us",
      "*SENT AT 7.20.07AM FRANKFURT TIME*"
    )
    .then((res) => {
      console.log("TESTER SENT");
    })
    .catch((err) => {
      console.log("ERROR");
    });
});

schedule.scheduleJob(date2, () => {
  client
    .sendMessage(
      "97339439432-1562572137@g.us",
      "*Price Alert*\n\nUS Monthly Inflation Announcement in 10 mins (At 4.30pm BH Time).\n\nGold price is expected to move."
    )
    .then((res) => {
      console.log("SENT TO MSS GROUP - INFLATION ANCMNT");
    })
    .catch((err) => {
      console.log("ERROR");
    });
});

const unixConverter = (timestamp) => {
  var unix_timestamp = timestamp;

  var date = new Date(unix_timestamp);

  var hours = date.getHours();

  var minutes = "0" + date.getMinutes();

  var seconds = "0" + date.getSeconds();

  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
};

client.on("message", (message) => {
  console.log("MESSAGE: ", message.body);
  console.log("^ MESSAGE ID: ", message.id.id);
  console.log("^^ FROM: ", message.from);
  console.log("^^^ AUTHOR: ", message.author);
  console.log("^^^^ TIMESTAMP: ", unixConverter(Date.now()));
  console.log("---------------------------------------------");
});

// function mssBuilder(range) {
//   return `https://sheets.googleapis.com/v4/spreadsheets/1OJaJ-yJX6vDt6PtUcw4KK5T59JKYAAd4j0NkZext6Jo/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
// }

// function kenzBuilder(range) {
//   return `https://sheets.googleapis.com/v4/spreadsheets/1_gYW1JXBL5Wqc-e--AHZ_Zgw56p132E858mJ1_v5Uzk/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
// }

// function qabBuilder(range) {
//   return `https://sheets.googleapis.com/v4/spreadsheets/17eTp9cHVcdfu936Kt9feSPHUonicWm6RSvWeVLK2-zA/values/${range}?key=AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4`;
// }

// async function mssGrab(range) {
//   let resp = await axios.get(mssBuilder(range));
//   return resp.data.values;
// }

// async function kenzGrab(range) {
//   let resp = await axios.get(kenzBuilder(range));
//   return resp.data.values;
// }

// async function qabGrab(range) {
//   let resp = await axios.get(qabBuilder(range));
//   return resp.data.values;
// }

async function goldPrice() {
  let resp = await axios.get("https://www.goldapi.io/api/XAU/USD", {
    headers: { "x-access-token": "goldapi-f20pyjatkuagctl5-io" },
  });
  return resp.data.price;
}

async function goldPriceStats() {
  let resp = await axios.get("https://www.goldapi.io/api/stat", {
    headers: { "x-access-token": "goldapi-9o7ltkznhulqi-io" },
  });
  return resp.data;
}

async function goldAPIStatus() {
  let resp = await axios.get("https://www.goldapi.io/api/status", {
    headers: { "x-access-token": "goldapi-9o7ltkznhulqi-io" },
  });
  return resp.data.result;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getQuantity(msg) {
  if (msg.slice(6, 7) === " ") {
    return parseInt(msg.slice(5, 6));
  } else {
    return parseInt(msg.slice(5, 7));
  }
}

// ----------------- HELP START -----------------

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

const completedOrders = [];

client.on("message", async (message) => {
  if (message.body.toLowerCase() === "!help") {
    message.reply(
      "MSS FIXING COMMANDS\n\n*!price* = Live XAUUSD price updated real-time.\n\n*!tt* = Live TT Bar rate updated real-time.\n\n\nCommand for fixing:\n\n*!fix X TT* where X is your quantity in digits. So to fix 5 TT please type *!fix 5 TT*\n\n*!setpremium* = Change premium"
    );
  }

  if (message.body.toLowerCase() === "!price") {
    goldPrice().then((price) => {
      message.reply(`Current Price: $${price}`);
    });
  }

  if (message.body.toLowerCase() === "!tt") {
    goldPrice().then((price) => {
      const ttRate = price * 1.417;
      const ttPrice = Math.ceil(ttRate) + TT_PREMIUM;

      message.reply(`Current TT Rate: BD${ttPrice}`);
    });
  }

  if (message.body.toLowerCase().includes("!fix")) {
    const input = message.body.trim();

    let randTT = Math.ceil(Math.random() * 11);

    if (input.length < 5 || input.length > 10) {
      message.reply(
        `${redXEmoji} Error\n\nPlease use correct format\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
      );
    } else {
      const quantity = getQuantity(message.body);

      if (input !== `!fix ${quantity} TT` || quantity <= 0) {
        message.reply(
          `${redXEmoji} Error\n\nPlease use correct format.\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
        );
      } else {
        goldPrice().then((price) => {
          const ttRate = price * 1.417;
          const ttPrice = Math.ceil(ttRate) + TT_PREMIUM;

          const totalPrice = quantity * ttPrice;
          const totalPriceFormatted = numberWithCommas(totalPrice);

          message.reply(
            `Order to fix ${quantity} TT at BD${ttPrice} each.\n\nTotal = *BD${totalPriceFormatted}*\n\nTo complete the order please reply to this message with your 4-digit PIN code within *30 seconds*.\n\nDummy code for testing = '#4567'`
          );
        });
      }
    }
  } // end of if !fix if/else

  if (message.body === "#4567") {
    message
      .getQuotedMessage()
      .then((quoted) => {
        let quantity = 0;
        let unitPrice = 0;
        const group = quoted.to;

        if (quoted.body.slice(14, 15) === " ") {
          quantity = parseInt(quoted.body.slice(13, 14));
        } else {
          quantity = parseInt(quoted.body.slice(13, 15));
        }

        if (quantity >= 10) {
          unitPrice = parseInt(quoted.body.slice(24, 28));
        } else {
          unitPrice = parseInt(quoted.body.slice(23, 27));
        }

        const timeNow = Date.now();

        const diff = parseInt(timeNow) - parseInt(quoted.timestamp * 1000);

        if (
          !quoted.fromMe ||
          !quoted.hasQuotedMsg ||
          quoted.body.length < 150
        ) {
          message.reply("Not a fixing message. PIN code not applicable.");
          return;
        }

        if (completedOrders.includes(quoted.id.id)) {
          message.reply(
            "Time limit exceeded or order already placed.\n\nPlease start a new order."
          );
          return;
        }

        completedOrders.push(quoted.id.id);

        if (diff > 30000) {
          message.reply(
            "Time limit exceeded or order already placed.\n\nPlease start a new order."
          );
        } else {
          message.reply(
            `Verified as *Dummy Jewellers* ${greenTickEmoji}\n\nFixing order placed, please await final confirmation.`
          );

          client
            .sendMessage(
              "120363041665012059@g.us",
              `Buy ${quantity} TT on screen.`
            )
            .then((res) => {
              console.log("SENT FIXING MESSAGE TO PGR");
              client
                .sendMessage(
                  group,
                  `Order confirmed for *Dummy Jewellers* ${greenTickEmoji}\n\n${quantity} TT fixed at BD${unitPrice} each.\n\n*Total = BD${numberWithCommas(
                    unitPrice * quantity
                  )}*\n\n*This message is your confirmation and proof of booking*\n\nThank you!`
                )
                .then((res) => {
                  console.log("CONFIRMATION SENT TO FIXER");
                })
                .catch((err) => {
                  console.log("ERROR ON SENDING CONFIRMATION TO FIXER");
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log("ERROR ON SENDING FIXING MESSAGE TO PGR");
              console.log(err);
              message.reply(
                "Sorry, we could not process your booking due to an error. Please contact MSS Jewellers directly."
              );
            });
        }
      })
      .catch((err) => {
        console.log("ERROR ON GETTING QUOTED MESSAGE");
        console.log(err);
        return;
      });
  } // end if #4567

  if (message.body.includes("!setpremium")) {
    
    if(message.body.length !== 13) {
      message.reply('Format:\n\n*!setpremium X*\n\nWhere X is a number from 0-9.')
    } else {
      TT_PREMIUM = parseInt(message.body.slice(-1));
      
      message.reply(`Premium changed. Type !getpremium to confirm.`)
    }

    



  }

  if (message.body === ("!getpremium")) {
    message.reply(`Current Premium: BD${TT_PREMIUM}`)
  }

  if (message.body.includes("!stats")) {
    goldPriceStats().then((stat) => {
      message.reply(
        `Reqs Today: ${stat.requests_today}\n\nReqs Yesterday: ${stat.requests_yesterday}\n\nReqs Month: ${stat.requests_month}\n\nReqs Last Month: ${stat.requests_last_month}`
      );
    });
  }

  if (message.body.includes("!gstatus")) {
    goldAPIStatus().then((status) => {
      message.reply(`${status}`);
    });
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
