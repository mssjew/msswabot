const axios = require("axios");
const fs = require("fs");
const schedule = require("node-schedule");
var emoji = require("node-emoji");

const greenTickEmoji = emoji.get("white_check_mark");
const redXEmoji = emoji.get("x");
const redCircle = emoji.get("red_circle");

const CURR_MONTH = "June 2022";
const MONTH_SEP = "Jun";
var SHEET_NAME = "";

let mainRange = `${SHEET_NAME}!D2:L101`;

const URL_ONE = "1Dv8aUw29Nu5uF3bFJhQzoZGDaiMnwC9W0JBpXRpcRgU";
const URL_TWO = "AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4";

// const internalPos = "Summary!C3";
// const sellRange = "Summary!B11:B38";
// const buyRange = "Summary!C11:C38";

// const qabSellRange = "Summary!B11:B28";
// const qabBuyRange = "Summary!C11:C28";

const MAHARANI_GROUP = "120363037936208858@g.us";

const EVERSHINE_GROUP = "120363041152671102@g.us";

const AL_SARRAJ_GROUP = "120363023532089325@g.us";

const KENZ_GROUP = "120363039742894365@g.us";

const OM_GROUP = "120363040482937774@g.us";

const NEW_MARHABA_GROUP = "120363020954397995@g.us";

const MUNTHER_GROUP = "120363040785247106@g.us";

const CHANDNI_GROUP = "120363038513888999@g.us";

const SUDEEP_GROUP = "120363021960532393@g.us";

const qrcode = require("qrcode-terminal");
const { L } = require("qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel");

const { Client, LocalAuth } = require("whatsapp-web.js");

function urlBuilder(range) {
  return `https://sheets.googleapis.com/v4/spreadsheets/${URL_ONE}/values/${range}?key=${URL_TWO}`;
}

async function dataGrab(range) {
  try {
    let resp = await axios.get(urlBuilder(range));
    return resp.data.values;
  } catch (err) {
    console.log(err);
  }
}

const monthReturner = (arr) => {
  return arr[0] === "";
};

const monthSeparator = (arr, month) => {
  let retArr = [];
  for (x in arr) {
    if (arr[x][1].includes(month)) retArr.push(arr[x]);
  }
  return retArr;
};

const quantityCalc = (arr) => {
  
  let quantArr = [];
  for(x in arr) {
    quantArr.push(arr[x][3])
  }
  
  let retval = 0;
  for(x in quantArr) {
    retval += parseInt(quantArr[x]);
  }

  return retval;
  
}


let TT_PREMIUM = 0;
const VALID_CODES = [
  "#6572",
  "#6950",
  "#1317",
  "#1299",
  "#1393",
  "#9643",
  "#9236",
  "#9473",
  "#0000",
];

// 6572 sarraj
// 6950 om
// 1317 maharani
// 1299 new marhaba
// 1393 kenz
// 9643 Munther
// 9236 Chandni
// 9473 Sudeep

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.initialize();

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessful
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

// 2000 PRICE CHECKER
// let pCounter = 0;

// const priceCheck = schedule.scheduleJob("*/1 * * * *", () => {
//   pCounter++;

//   goldPrice().then((price) => {
//     console.log(`Running Price Check No. ${pCounter} - $${price}`);
//     if(price > 2000) {
//       client
//       .sendMessage(
//       "97339439432-1562572137@g.us",
//       "*Price Alert*\n\nGold above $2000."
//     )
//     .then((res) => {
//       console.log("Gold Alert Sent");
//       priceCheck.cancel();
//       console.log("Price Check Cancelled Due to Success");
//     })
//     .catch((err) => {
//       console.log("Gold Alert Failed To Send");
//     });
//     }

//   }).catch((err) => console.log("Error on gold price check per min: ", err));

// });

// schedule.scheduleJob(date2, () => {
//   client
//     .sendMessage(
//       "97339439432-1562572137@g.us",
//       "*Price Alert*\n\nUS Monthly Inflation Announcement in 10 mins (At 4.30pm BH Time).\n\nGold price is expected to move."
//     )
//     .then((res) => {
//       console.log("SENT TO MSS GROUP - INFLATION ANCMNT");
//     })
//     .catch((err) => {
//       console.log("ERROR");
//     });
// });

const unixConverter = (timestamp) => {
  var unix_timestamp = timestamp;

  var date = new Date(unix_timestamp);

  var hours = date.getHours();

  var minutes = "0" + date.getMinutes();

  var seconds = "0" + date.getSeconds();

  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  let day = date.toJSON().slice(0, 10).split("-").join("/");

  return `${formattedTime} - ${day}`;
};

client.on("message", async (message) => {
  const chat = await message.getChat();

  console.log("                                              ");
  console.log("IS GROUP: ", chat.isGroup);
  console.log("MESSAGE: ", message.body);
  console.log("MESSAGE ID: ", message.id.id);
  console.log("FROM: ", message.from);
  console.log("GROUP AUTHOR: ", message.author);
  console.log("GROUP NAME: ", chat.name);
  console.log("TIMESTAMP: ", unixConverter(Date.now()));
  console.log("---------------------------------------------");
  console.log("                                              ");
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
    headers: { "x-access-token": "goldapi-f20pyjatkuagctl5-io" },
  });
  return resp.data;
}

async function goldAPIStatus() {
  let resp = await axios.get("https://www.goldapi.io/api/status", {
    headers: { "x-access-token": "goldapi-f20pyjatkuagctl5-io" },
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

function isACode(msg) {
  if (msg.length === 5 && msg[0] === "#") {
    return true;
  } else {
    return false;
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
  const chat = await message.getChat();
  if (message.body.toLowerCase() === "!all") {
    message.reply(
      "!help\n!commands\n!booking\n!price\n!tt\n!fix\n!setpremium\n!getpremium\n!apiStats\n!apiWorking"
    );
  } // end !commands

  if (message.body.toLowerCase() === "!help") {
    message.reply(
      "MSS WhatsApp Bot.\n\nStill in development.\n\nPlease type !commands to view the list of services."
    );
  } // end !help

  if (message.body.toLowerCase() === "!commands") {
    message.reply(
      "*!price* = Live Gold Price.\n\n*!tt* = Live TT Rate.\n\n*!booking* = 24/7 Fixing Service. (min. 5 TT)"
    );
  } // end !commands

  if (message.body.toLowerCase() === "!bookings") {
    console.log("Entered here.");

    let company = "";

   

    if (message.from === MAHARANI_GROUP) {
      company = "Maharani Jewellers";
      SHEET_NAME = "Maharani_K00014";
    } else if (message.from === NEW_MARHABA_GROUP) {
      company = "New Marhaba Jewellery";
      SHEET_NAME = "NewMarhaba_N00001";
    } else if (message.from === KENZ_GROUP) {
      company = "Kenz Al Bahrain";
      SHEET_NAME = "Kenz_K00010";
    } else if (message.from === AL_SARRAJ_GROUP) {
      company = "Al Sarraj Jewellers";
      SHEET_NAME = "AlSarraj_";
    } else if (message.from === OM_GROUP) {
      company = "Om Jewellery";
      SHEET_NAME = "Om_O0001";
    } else if (message.from === MUNTHER_GROUP) {
      company = "Munther Jewellery";
      SHEET_NAME = "Munther_M";
    } else if (message.from === CHANDNI_GROUP) {
      company = "Chandni Jewellers";
      SHEET_NAME = "Chandni";
    } else if (message.from === SUDEEP_GROUP) {
      company = "Sudeep Jewellery";
      SHEET_NAME = "Sudeep_";
    } else {
      company = "";
      SHEET_NAME = "Kenz_K00010";
    }

    dataGrab(mainRange)
      .then((data) => {
        let bookingsList = `*${CURR_MONTH} TT Bookings for ${company}:*\n`;

        const allBookings = data.filter(monthReturner).reverse();

        const monthBookings = monthSeparator(allBookings, MONTH_SEP).reverse();

        let totalMonthly = quantityCalc(monthBookings);

        monthBookings.forEach((x) => {
          bookingsList += `\n*Date:* ${x[1]}\n*Amount:* ${x[3]} TT\n*Price:* ${x[4]}\n*Total:* ${x[5]}\n`;
        });

        bookingsList += `\n${CURR_MONTH} Total For ${company}: *${totalMonthly} TTs*\n\nPlease note, new bookings may take some time to update in our system.`;

        message.reply(bookingsList);

        // if (dayBookings.length === 0) {
        //   const tableRow = document.createElement("tr");
        //   currentTableBody.appendChild(tableRow);

        //   for (let i = 0; i < 8; i++) {
        //     const cell = document.createElement("td");
        //     tableRow.appendChild(cell);
        //     cell.textContent = "---";
        //   }

        //   dailyTotalSentence.textContent = "No bookings today.";
        //   dailyTotalSentence.style.color = "crimson";

        // }

        // dayBookings.forEach((row) => {
        //   row.shift();
        //   const tableRow = document.createElement("tr");
        //   currentTableBody.appendChild(tableRow);
        //   row.forEach((cellData) => {
        //     const cell = document.createElement("td");
        //     tableRow.appendChild(cell);
        //     cell.textContent = cellData;

        //     if (cell.textContent === "PENDING") {
        //       cell.classList.add("pending");
        //     }
        //     if (cell.textContent === "COMPLETE") {
        //       cell.classList.add("complete");
        //     }
        //   });
        // });

        // if (monthBookings.length === 0) {
        //   const tableRow = document.createElement("tr");
        //   monthTableBody.appendChild(tableRow);

        //   for (let i = 0; i < 8; i++) {
        //     const cell = document.createElement("td");
        //     tableRow.appendChild(cell);
        //     cell.textContent = "---";
        //   }

        //   monthlyTotalSentence.textContent = "No bookings this month.";
        //   monthlyTotalSentence.style.color = "crimson";

        // }

        // monthBookings.forEach((row) => {
        //   row.shift();
        //   const tableRow = document.createElement("tr");
        //   monthTableBody.appendChild(tableRow);
        //   row.forEach((cellData) => {
        //     const cell = document.createElement("td");
        //     tableRow.appendChild(cell);
        //     cell.textContent = cellData;

        //     if (cell.textContent === "PENDING") {
        //       cell.classList.add("pending");
        //     }
        //     if (cell.textContent === "COMPLETE") {
        //       cell.classList.add("complete");
        //     }
        //   });
        // });//end febBookings
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (message.body.toLowerCase() === "!price") {
    goldPrice().then((price) => {
      message.reply(`Current Price: $${price}`);
    });
  }

  if (message.body.toLowerCase() === "!tt") {
    if (message.from === MAHARANI_GROUP) {
      TT_PREMIUM = -2;
    } else if (message.from === NEW_MARHABA_GROUP) {
      TT_PREMIUM = -2;
    } else if (message.from === KENZ_GROUP) {
      console.log("MESSAGE FROM KENZ");
      TT_PREMIUM = -3;
    } else if (message.from === AL_SARRAJ_GROUP) {
      TT_PREMIUM = 0;
    } else if (message.from === OM_GROUP) {
      TT_PREMIUM = 0;
    } else if (message.from === MUNTHER_GROUP) {
      TT_PREMIUM = -2;
    } else if (message.from === CHANDNI_GROUP) {
      TT_PREMIUM = -2;
    } else if (message.from === SUDEEP_GROUP) {
      TT_PREMIUM = 0;
    } else {
      TT_PREMIUM = 0;
    }

    goldPrice().then((price) => {
      if (isNaN(TT_PREMIUM)) {
        message.reply(
          "Application error.\nSorry, please contact MSS directly for fixing."
        );
      } else {
        const ttRate = price * 1.417;
        const ttPrice = Math.ceil(ttRate) + TT_PREMIUM;
        message.reply(`Current TT Rate: BD${ttPrice}`);
      }
    });
  }

  if (message.body.toLowerCase().includes("!fix")) {
    // 6572 sarraj
    // 6950 om
    // 1317 maharani
    // 1299 new marhaba
    // 1393 kenz
    // 9643 Munther
    // 9236 Chandni
    // 9473 Sudeep

    let fixingCode = "";
    const input = message.body.trim().toLowerCase();

    let randTT = Math.ceil(Math.random() * 5);

    if (input.length < 5 || input.length > 10) {
      message.reply(
        `${redXEmoji} Error\n\nPlease use correct format\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
      );
    } else {
      if (message.from === MAHARANI_GROUP) {
        TT_PREMIUM = -2;
        fixingCode = "#1317";
      } else if (message.from === NEW_MARHABA_GROUP) {
        TT_PREMIUM = -2;
        fixingCode = "#1299";
      } else if (message.from === KENZ_GROUP) {
        console.log("MESSAGE FROM KENZ");
        TT_PREMIUM = -3;
        fixingCode = "#1393";
      } else if (message.from === AL_SARRAJ_GROUP) {
        TT_PREMIUM = 0;
        fixingCode = "#6572";
      } else if (message.from === OM_GROUP) {
        TT_PREMIUM = 0;
        fixingCode = "#6950";
      } else if (message.from === MUNTHER_GROUP) {
        TT_PREMIUM = -2;
        fixingCode = "#9643";
      } else if (message.from === CHANDNI_GROUP) {
        TT_PREMIUM = -2;
        fixingCode = "#9236";
      } else if (message.from === SUDEEP_GROUP) {
        TT_PREMIUM = 0;
        fixingCode = "#9473";
      } else {
        TT_PREMIUM = 0;
      }

      const quantity = getQuantity(message.body);

      if (input !== `!fix ${quantity} tt` || quantity <= 0) {
        message.reply(
          `${redXEmoji} Error\n\nPlease use correct format.\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
        );
      } else if (quantity > 10) {
        message.reply(
          `Sorry, please contact MSS Jewellers directly to fix more than 10TT in one trade.`
        );
      } else {
        goldPrice().then((price) => {
          if (isNaN(TT_PREMIUM)) {
            message.reply(
              "Sorry, we are unable to process your request at this time.\nPlease contact MSS directly for fixing."
            );
          } else {
            const ttRate = price * 1.417;
            const ttPrice = Math.ceil(ttRate) + TT_PREMIUM;

            const totalPrice = quantity * ttPrice;
            const totalPriceFormatted = numberWithCommas(totalPrice);

            message.reply(
              `Order to fix ${quantity} TT at BD${ttPrice} each.\n\nTotal = *BD${totalPriceFormatted}*\n\nTo complete the order please quote this message and reply with your 4-digit PIN code within *30 seconds*.\n\nAfter 30 seconds your order price will expire and you will have to place a new order.\n\n*Your fixing code is ${fixingCode}*, please include the #.`
            );
          }
        });
      }
    }
  } // end of if !fix if/else

  if (isACode(message.body) && !message.hasQuotedMsg) {
    message.reply(
      `${redXEmoji} Error.\n\nYou did not quote reply an order message.\n\nPlease swipe on the message and then reply with your code.`
    );
  }

  if (isACode(message.body) && message.hasQuotedMsg) {
    if (VALID_CODES.includes(message.body)) {
      let fixerName = "";

      // ["#6572", "#6950", "#1317", "#1299", "#0000"];
      // 6572 sarraj
      // 6950 om
      // 1317 maharani
      // 1299 new marhaba
      // 1393 kenz
      // 9643 Munther
      // 9236 Chandni
      // 9473 Sudeep
      if (message.body === "#6572") {
        fixerName = "Al Sarraj Jewellers";
      } else if (message.body === "#6950") {
        fixerName = "Om Jewellery";
      } else if (message.body === "#0000") {
        fixerName = "Dummy Jewellers";
      } else if (message.body === "#1317") {
        fixerName = "Maharani Jewellers";
      } else if (message.body === "#1299") {
        fixerName = "New Marhaba Jewellery";
      } else if (message.body === "#1393") {
        fixerName = "Kenz Al Bahrain";
      } else if (message.body === "#9643") {
        fixerName = "Munther Jewellery";
      } else if (message.body === "#9236") {
        fixerName = "Chandni Jewellers";
      } else if (message.body === "#9473") {
        fixerName = "Sudeep Jewellery";
      }

      message
        .getQuotedMessage()
        .then((quoted) => {
          let quantity = 0;
          let unitPrice = 0;
          const group = quoted.to;

          const groupID = chat.from;

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

          if (isNaN(quantity)) {
            message.reply(
              "Calculation error, please try again.\nIf you receive this error again please contact MSS directly for fixing."
            );
            return;
          }

          if (isNaN(unitPrice)) {
            message.reply(
              "Calculation error, please try again.\nIf you receive this error again please contact MSS directly for fixing."
            );
            return;
          }

          if (quantity >= 20) {
            message.reply("Quantity error, please restart your order.");
            return;
          } else if (quantity < 0) {
            message.reply("Quantity error, please restart your order.");
            return;
          }

          const timeNow = Date.now();

          const diff = parseInt(timeNow) - parseInt(quoted.timestamp * 1000);

          if (
            !quoted.fromMe ||
            !quoted.hasQuotedMsg ||
            !quoted.body.startsWith("Order to fix") ||
            quoted.body.length < 150
          ) {
            message.reply("Not a fixing message. PIN code not applicable.");
            return;
          }

          if (completedOrders.includes(quoted.id.id)) {
            message.reply("Order place already.\n\nPlease start a new order.");
            return;
          }

          completedOrders.push(quoted.id.id);

          if (diff > 30000) {
            message.reply("Time limit exceeded\n\nPlease start a new order.");
          } else {
            message.reply(
              `Order confirmed for *${fixerName}* ${greenTickEmoji}\n\n${quantity} TT fixed at BD${unitPrice} each.\n\n*Total = BD${numberWithCommas(
                unitPrice * quantity
              )}*\n\n*This message is your confirmation and proof of booking.*\n\nThank you!`
            );
            client.sendMessage(
              "919946147016@c.us",
              `${redCircle} Fixing Alert ${redCircle}\n\n${fixerName} just booked ${quantity} TT at BD${unitPrice} each.\n\nTotal = BD${numberWithCommas(
                unitPrice * quantity
              )}.\n\nUpdate Daily Fixing Sheet.`
            );
            client.sendMessage(
              "97339007836@c.us",
              `${redCircle} Fixing Alert ${redCircle}\n\n${fixerName} just booked ${quantity} TT at BD${unitPrice} each.\n\nTotal = BD${numberWithCommas(
                unitPrice * quantity
              )}.\n\nUpdate Daily Fixing Sheet.`
            );
          }
        })
        .catch((err) => {
          message.reply(
            "Sorry, we could not process your fixing order due to an error. Please contact MSS Jewellers directly."
          );
          console.log("ERROR ON GETTING QUOTED MESSAGE");
          console.log(err);
          return;
        });
    } // end if code valid
    else {
      message.reply("Invalid code.");
    }
  } // end if isCode()

  if (message.body.includes("!setpremium")) {
    const chat = await message.getChat();

    // if(message.author !== "97333737302@c.us"|| message.author !== "97338999888@c.us") {
    //   message.reply("Not authorized.")
    // } else {
    if (message.body.trim().length < 13 || message.body.trim().length > 14) {
      message.reply(
        "Format:\n\n*!setpremium X*\n\nNegative premium: *!setpremium -X*\n\nX is a number from 0-9.\n\nAdds digit value 1.417 rate."
      );
      return;
    } else if (message.body.trim().length === 13) {
      if (isNaN(parseInt(message.body.slice(-1)))) {
        message.reply(`${redXEmoji} Error\n\nPlease enter a digit from 0-9.`);
      } else {
        TT_PREMIUM = parseInt(message.body.slice(-1));

        message.reply(`Premium changed. Type !getpremium to confirm.`);
      }
    } else if (message.body.trim().length === 14) {
      if (message.body.trim()[12] !== "-") {
        message.reply(
          `${redXEmoji} Error\n\nPlease use the correct format for negative premium:\n\n*!setpremium -X* where X is between 0-9.`
        );
      } else if (isNaN(parseInt(message.body.slice(-1)))) {
        message.reply(`${redXEmoji} Error\n\nPlease enter a digit from 0-9.`);
      } else {
        TT_PREMIUM = 0 - parseInt(message.body.slice(-1));

        message.reply(
          `Premium changed to *negative*. Type !getpremium to confirm.`
        );
      }
    }
    //}
  }

  if (message.body === "!getpremium") {
    const chat = await message.getChat();
    if (
      message.author === "97333737302@c.us" ||
      message.author === "97338999888@c.us"
    ) {
      message.reply(`Current Premium: BD${TT_PREMIUM}`);
    } else {
      message.reply("Not authorized.");
    }
  }

  if (message.body.includes("!apiStats")) {
    goldPriceStats().then((stat) => {
      message.reply(
        `Reqs Today: ${stat.requests_today}\n\nReqs Yesterday: ${stat.requests_yesterday}\n\nReqs Month: ${stat.requests_month}\n\nReqs Last Month: ${stat.requests_last_month}`
      );
    });
  }

  if (message.body.includes("!apiWorking")) {
    goldAPIStatus().then((status) => {
      message.reply(`${status}`);
    });
  }
});
