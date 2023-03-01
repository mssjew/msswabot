const axios = require("axios");
const fs = require("fs");
const schedule = require("node-schedule");
var emoji = require("node-emoji");

const greenTickEmoji = emoji.get("white_check_mark");
const redXEmoji = emoji.get("x");
const redCircle = emoji.get("red_circle");

const CURR_MONTH = "August 2022";
const MONTH_SEP = "Aug";

var mainRange = ``;

const URL_ONE = "1Dv8aUw29Nu5uF3bFJhQzoZGDaiMnwC9W0JBpXRpcRgU";
const URL_TWO = "AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4";

// const internalPos = "Summary!C3";
// const sellRange = "Summary!B11:B38";
// const buyRange = "Summary!C11:C38";
// test 


// const qabSellRange = "Summary!B11:B28";
// const qabBuyRange = "Summary!C11:C28";
const DUMMY_SARAJ = "120363024046301336@g.us";
const INTERNAL9 = "120363023099866055@g.us";

const MSS_DAILY_REPORT = "97339439432-1562572137@g.us";

const MAHARANI_GROUP = "120363037936208858@g.us";
const AL_SARRAJ_GROUP = "120363023532089325@g.us";
const KENZ_GROUP = "120363039742894365@g.us";
const OM_GROUP = "120363040482937774@g.us";
const NEW_MARHABA_GROUP = "120363020954397995@g.us";
const MUNTHER_GROUP = "120363040785247106@g.us";
const CHANDNI_GROUP = "120363038513888999@g.us";
const SUDEEP_GROUP = "120363021960532393@g.us";
const MUKESH_GROUP = "120363024035832201@g.us";
const MATTATHIL_GROUP = "120363024899872156@g.us";
//second half
const JALAL_GROUP = "120363021530408858@g.us"; //1293 Al-Jalal Jewellery
const AREFI_GROUP = "120363040375751137@g.us"; //9152 Al-Arefi Jewellery
const DDEVJI_GROUP = "120363039610631875@g.us"; //1124 Dinesh Devji Jewellers
const DILU_GROUP = "120363041484099411@g.us"; //5324 Dilu Jewellery
const ALAA_GROUP = "120363040279144042@g.us"; //1175  Alaa Jewellery
const LIBERTY_GROUP = "120363020737570895@g.us"; //6309 Liberty Jewellery
const SHAHZAIB_GROUP = "120363041490887614@g.us"; //9325 Shahzaib Jewellers
const FAIZA_GROUP = "120363024241328715@g.us"; //4841 FAIZA JEWELLERY
const EVERSHINE_GROUP = "120363041152671102@g.us"; //6555  Evershine Jewellery
const FAREEDA_GROUP = "120363042406237560@g.us"; //4897 FAREEDA JEWELLERY
const JP_GROUP = "120363042038578843@g.us"; //4496 J AND P JEWELLERS
///
const THANGALS_DEMO = "120363043914306999@g.us"; //1233
const CHEMMANUR_GROUP = "120363026813742205@g.us"; //4472

const JASRA_GROUP = "120363024380410414@g.us"; //8293
const SONA_GROUP = "120363043168822900@g.us"; //1152

const AGK_GROUP = "120363026257640092@g.us"; //#1234

const GORDHANDAS_GROUP = "120363046709727304@g.us"; //#6506

const PRAKASH_GROUP = "120363027766357004@g.us"; //1191

const YAFIE_GROUP = "120363027711841766@g.us"; //4675

const SIGNALS_GROUP = "120363028259299612@g.us";

const ALSEEF_GROUP = "120363046622693684@g.us"; // 4046


const MASHALLAH_GROUP = "120363050526117412@g.us"; //7693

const NEW_MASHALLAH_GROUP = "120363069297702474@g.us";




//AL YAFIE JEWELLERIES CO. W.L.L

// Chemmanur Jewellers

const PRICE_CORRECTOR = 0;

const hamzaNumber = "97338999888@c.us";
const sajeevNumber = "919946147016@c.us";
const izharNumber = "97333737302@c.us";
const zubairNumber = "97335470471@c.us";

const alertsGroup1 = [
  MAHARANI_GROUP,
  AL_SARRAJ_GROUP,
  KENZ_GROUP,
  OM_GROUP,
  NEW_MARHABA_GROUP,
  MUNTHER_GROUP,
  CHANDNI_GROUP,
  SUDEEP_GROUP,
  MUKESH_GROUP,
  MATTATHIL_GROUP,
  MSS_DAILY_REPORT,
  JASRA_GROUP,
  PRAKASH_GROUP
];

const alertsGroup2 = [
  JALAL_GROUP,
  AREFI_GROUP,
  DDEVJI_GROUP,
  DILU_GROUP,
  ALAA_GROUP,
  LIBERTY_GROUP,
  SHAHZAIB_GROUP,
  FAIZA_GROUP,
  EVERSHINE_GROUP,
  FAREEDA_GROUP,
  JP_GROUP,
  CHEMMANUR_GROUP,
  SONA_GROUP,
  GORDHANDAS_GROUP,
  ALSEEF_GROUP
];

const ttGroup1 = [
  MAHARANI_GROUP,
  KENZ_GROUP,
  OM_GROUP,
  NEW_MARHABA_GROUP,
  MUNTHER_GROUP,
  CHANDNI_GROUP,
  SUDEEP_GROUP,
  MUKESH_GROUP,
  MATTATHIL_GROUP,
  CHEMMANUR_GROUP,
  JASRA_GROUP,
];

const ttGroup2 = [
  JALAL_GROUP,
  AREFI_GROUP,
  DDEVJI_GROUP,
  DILU_GROUP,
  ALAA_GROUP,
  LIBERTY_GROUP,
  SHAHZAIB_GROUP,
  FAIZA_GROUP,
  EVERSHINE_GROUP,
  FAREEDA_GROUP,
  JP_GROUP,
  SONA_GROUP,
  GORDHANDAS_GROUP,
  YAFIE_GROUP
];

const internalGroups = [MSS_DAILY_REPORT, KENZ_GROUP];

const qrcode = require("qrcode-terminal");
const { L } = require("qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel");
const { MessageMedia } = require("whatsapp-web.js");

const { Client, LocalAuth } = require("whatsapp-web.js");

var TT_PREMIUM = 0;
const VALID_CODES = [
  "#6572",
  "#6950",
  "#1317",
  "#1299",
  "#1393",
  "#9643",
  "#9236",
  "#9473",
  "#5784",
  "#5016",
  "#1293",
  "#9152",
  "#1124",
  "#5324",
  "#1175",
  "#6309",
  "#9325",
  "#4841",
  "#6555",
  "#4897",
  "#4496",
  "#4472",
  "#8293",
  "#1152",
  "#6506",
  "#1191",
  "#4675",
  "#1234",
  "#4046",
  "#5769",
  "#0001",
];

// 6572 sarraj
// 6950 om
// 1317 maharani
// 1299 new marhaba
// 1393 kenz
// 9643 Munther
// 9236 Chandni
// 9473 Sudeep
// 5784 Mukesh
// 5016 Mattathil

//1293 Al-Jalal Jewellery *
//9152 Al-Arefi Jewellery*
//1124 Dinesh Devji Jewellers*
//5324 Dilu Jewellery
//1175 Alaa Jewellery
//6309 Liberty Jewellery
//9325 Shahzaib Jewellers
//4841 FAIZA JEWELLERY
//6555 Evershine Jewellery
//4897 FAREEDA JEWELLERY
//4496 J AND P JEWELLERS

//8293 Jasra
//1152 Sona

//6506 Gordhandas Jewellers

//1191 Prakash Jewellery

//4046 Al Seef Jewellery


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
  console.log(Date.now());
});

async function dataGrab(range) {
  try {
    let resp = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${URL_ONE}/values/${range}?key=${URL_TWO}`
    );
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
  for (x in arr) {
    quantArr.push(arr[x][3]);
  }

  let retval = 0;
  for (x in quantArr) {
    retval += parseInt(quantArr[x]);
  }
  return retval;
};

// const date0 = new Date(2023, 1, 1, 9, 00, 0);
// const date1 = new Date(2023, 1, 1, 13, 00, 0);
// const date2 = new Date(2023, 1, 1, 14, 45, 0);
// const date3 = new Date(2023, 1, 1, 18, 45, 0);


// const dateChecker = new Date(2022, 8, 13, 12, 10, 0);

// schedule.scheduleJob(date0, () => {
//   client
//     .sendMessage(
//       hamzaNumber,
//       "This should send at 12pm on 1st Feb 2023."
//     )
//     .then((res) => {
//       console.log("SENT ALERT REMINDER TO HS");
//     })
//     .catch((err) => {
//       console.log("ERROR IN SENDING ALERT REMINDER TO HS");
//     });
// });


// schedule.scheduleJob(date1, () => {
//   client
//     .sendMessage(
//       SIGNALS_GROUP,
//       "*15 Minute Alert*\n\n*News:* US Employment Data\n\n*Time:* 4.15PM Bahrain Time\n\nHigh Impact Data and Gold is expected to move."
//     )
//     .then((res) => {
//       console.log("SENT ALERT REMINDER TO SIGNALS GROUP");
//     })
//     .catch((err) => {
//       console.log("ERROR IN SENDING ALERT REMINDER TO HS");
//     });
// });


// schedule.scheduleJob(date2, () => {
//   client
//     .sendMessage(
//       SIGNALS_GROUP,
//       "*15 Minute Alert*\n\n*News:* US Manufacturing Data\n\n*Time:* 6PM Bahrain Time\n\nHigh Impact Data and Gold is expected to move."
//     )
//     .then((res) => {
//       console.log("SENT ALERT REMINDER TO SIGNALS GROUP");
//     })
//     .catch((err) => {
//       console.log("ERROR IN SENDING ALERT REMINDER TO HS");
//     });
// });

// schedule.scheduleJob(date3, () => {
//   client
//     .sendMessage(
//       SIGNALS_GROUP,
//       "*15 Minute Alert*\n\n*News:* US Interest Rate Update\n\n*Time:* 10PM Bahrain Time\n\nHigh Impact Data and Gold is expected to move.\n\nFOMC conference will start at 10.30PM which will cause further movement in price."
//     )
//     .then((res) => {
//       console.log("SENT ALERT REMINDER TO SIGNALS GROUP");
//     })
//     .catch((err) => {
//       console.log("ERROR IN SENDING ALERT REMINDER TO HS");
//     });
// });



// schedule.scheduleJob(date2, () => {
//   client
//     .sendMessage(
//       SIGNALS_GROUP,
//       "*15 Minute Alert*\n\n*News:* US Employment Data\n\n*Time:* 4.15PM Bahrain Time\n\n*Impact*: High"
//     )
//     .then((res) => {
//       console.log("SENT ALERT REMINDER TO HS");
//     })
//     .catch((err) => {
//       console.log("ERROR IN SENDING ALERT REMINDER TO HS");
//     });
// });

// schedule.scheduleJob(date1, () => {
//   ttGroup1.forEach((group) => {
//     client
//       .sendMessage(
//         group,
//         "Dear Customer,\n\nTT Bar stock is now available."
//       )
//       .then((res) => {
//         console.log("SENT ALERT MESSAGE TO ", group);
//       })
//       .catch((err) => {
//         console.log("ERROR WHILE SENDING TO ", group);
//       });
//   });
// });

// schedule.scheduleJob(date2, () => {
//   ttGroup2.forEach(group => {
//     client
//     .sendMessage(
//       group,
//       "Dear Customer,\n\nTT Bar stock is now available."
//     )
//     .then((res) => {
//       console.log("SENT ALERT MESSAGE TO ", group);
//     })
//     .catch((err) => {
//       console.log("ERROR WHILE SENDING TO ", group);
//     });

//   })
// });

// schedule.scheduleJob(date1, () => {
//   alertsGroup1.forEach((group) => {
//     client
//       .sendMessage(
//         group,
//         "*Price Movement Alert*\n\nUS Inflation Data will be published in 15 mins, at 3.30pm Bahrain time.\n\nGold Price is expected to move.\n\n_Disclaimer: This is not financial advice therefore MSS Jewellers holds no responsibility for any trades you may pursue_"
//       )
//       .then((res) => {
//         console.log("SENT ALERT MESSAGE TO ", group);
//       })
//       .catch((err) => {
//         console.log("ERROR WHILE SENDING TO ", group);
//       });
//   });
// });

// schedule.scheduleJob(date2, () => {
//   alertsGroup2.forEach((group) => {
//     client
//       .sendMessage(
//         group,
//         "*Price Movement Alert*\n\nUS Inflation Data will be published in 15 mins, at 3.30pm Bahrain time.\n\nGold Price is expected to move.\n\n_Disclaimer: This is not financial advice therefore MSS Jewellers holds no responsibility for any trades you may pursue_"
//       )
//       .then((res) => {
//         console.log("SENT ALERT MESSAGE TO ", group);
//       })
//       .catch((err) => {
//         console.log("ERROR WHILE SENDING TO ", group);
//       });
//   });
// });

// schedule.scheduleJob(date2, () => {
//   alertsGroup2.forEach(group => {
//     client
//     .sendMessage(
//       group,
//       "*Price Movement Alert*\n\nFOMC Statement will be published at 9pm. Fed Chairman Jerome Powell will be speaking at 9.30pm.\n\nGold price is expected to move between 9 and 10pm.\n\n_Disclaimer: This is not financial advice therefore MSS Jewellers holds no responsibility for any trades you may pursue_"
//     )
//     .then((res) => {
//       console.log("SENT ALERT MESSAGE TO ", group);
//     })
//     .catch((err) => {
//       console.log("ERROR WHILE SENDING TO ", group);
//     });

//   })
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

async function goldPrice2() {
  let resp = await axios.get(
    "https://marketdata.tradermade.com/api/v1/live?currency=XAUUSD&api_key=gUkkarv9QS3rDdC4nbNk"
  );
  return resp.data.quotes[0].ask;

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

async function grabPic() {
  const media = await MessageMedia.fromUrl(
    "https://d1htfwxafklghc.cloudfront.net/guide.webp"
  );
  return media;
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
      "*!price* = Live Gold Price.\n\n*!tt* = Live TT Rate.\n\n*!fix* = 24/7 Fixing Service.\n\n*!bookings* = View your monthly TT bookings."
    );
  } // end !commands

  if (message.body.toLowerCase() === "!pic") {
    grabPic().then((pic) => {
      message.reply(pic);
    });
  }

  let PREMIUMS = [0, -3,];

  if (message.body.toLowerCase() === "!groups") {
    message.reply(
      "Group Numbers:\n\n1 - Maharani\n2 - New Marhaba\n3 - Sarraj\n4 - Om\n5 - Munther\n6 - Chandni\n7 - Sudeep\n8 - Mukesh\n9 - Mattathil\n10 - Jalal\n11 - D. Devji\n12 - Dilu\n13 - Alaa\n14 - Liberty\n15 - Shahzaib\n16 - Faiza\n17 - Evershine\n18 - Fareeda\n19 - JP\n20 - Chemmanur\n21 - Jasra\n22 - Sonaj"
    );
  } // end !groups

  if (message.body.toLowerCase() === "!bookings") {
    let company = "";

    if (message.from === MAHARANI_GROUP || message.from === DUMMY_SARAJ) {
      company = "Maharani Jewellers";
      mainRange = "Maharani_K00014!D2:L201";
    } else if (message.from === NEW_MARHABA_GROUP) {
      company = "New Marhaba Jewellery";
      mainRange = "NewMarhaba_N00001!D2:L201";
    } else if (message.from === KENZ_GROUP) {
      company = "Kenz Al Bahrain";
      mainRange = "Kenz_K00010!D2:L201";
    } else if (message.from === AL_SARRAJ_GROUP) {
      company = "Al Sarraj Jewellers";
      mainRange = "AlSarraj_!D2:L201";
    } else if (message.from === OM_GROUP) {
      company = "Om Jewellery";
      mainRange = "Om_O0001!D2:L201";
    } else if (message.from === MUNTHER_GROUP) {
      company = "Munther Jewellery";
      mainRange = "Munther_M!D2:L201";
    } else if (message.from === CHANDNI_GROUP) {
      company = "Chandni Jewellers";
      mainRange = "Chandni!D2:L201";
    } else if (message.from === SUDEEP_GROUP) {
      company = "Sudeep Jewellery";
      mainRange = "Sudeep_!D2:L201";
    } else if (message.from === MUKESH_GROUP) {
      company = "Mukesh & Brothers";
      mainRange = "MukeshBros_!D2:L201";
    } else if (message.from === MATTATHIL_GROUP) {
      company = "Mattathil Jewellers";
      mainRange = "MATTATHIL_JEWELLERY!D2:L201";
    } else if (message.from === JALAL_GROUP) {
      company = "Al-Jalal Jewellers";
      mainRange = "Jalal_Jewellery!D2:L201";
    } else if (message.from === DDEVJI_GROUP) {
      company = "Dinesh Devji Jewellers";
      mainRange = "Devji21_D00001!D2:L201";
    } else if (message.from === DILU_GROUP) {
      company = "Dilu Jewellers";
      mainRange = "Dilu!D2:L201";
    } else if (message.from === ALAA_GROUP) {
      company = "Alaa Jewellery";
      mainRange = "Alaa_A00086!D2:L201";
    } else if (message.from === LIBERTY_GROUP) {
      company = "Liberty Jewellery";
      mainRange = "Liberty_L00001!D2:L201";
    } else if (message.from === SHAHZAIB_GROUP) {
      company = "Shahzaib Jewellery";
      mainRange = "Shahzaib_!D2:L201";
    } else if (message.from === FAIZA_GROUP) {
      company = "Faiza Jewellery";
      mainRange = "Faiza!D2:L201";
    } else if (message.from === EVERSHINE_GROUP) {
      company = "Evershine Jewellery";
      mainRange = "Evershine_Jewellery!D2:L201";
    } else if (message.from === FAREEDA_GROUP) {
      company = "Fareeda Jewellery";
      mainRange = "FAREEDA_JEWELLERY!D2:L201";
    } else if (message.from === JP_GROUP) {
      company = "J and P Jewellers";
      mainRange = "J_and_P!D2:L201";
    } else if (message.from === CHEMMANUR_GROUP) {
      company = "Chemmanur Jewellers";
      mainRange = "CHEMMANUR_JEWELLERY!D2:L201";
    } else if (message.from === AGK_GROUP) {
      company = "AGK Jewellers";
      mainRange = "AGK!D2:L201";
    } else {
      company = "";
      mainRange = "NA";
    } //need to add ghorndas and prakash and yafies

    //1293 Al-Jalal Jewellery *
    //9152 Al-Arefi Jewellery*
    //1124 Dinesh Devji Jewellers*
    //5324 Dilu Jewellery
    //1175  Alaa Jewellery
    //6309 Liberty Jewellery
    //9325 Shahzaib Jewellers
    //4841 FAIZA JEWELLERY
    //6555  Evershine Jewellery
    //4897 FAREEDA JEWELLERY
    //4496 J AND P JEWELLERS

    console.log("MAIN RANGE BEFORE GRAB: ", mainRange);
    dataGrab(mainRange)
      .then((data) => {
        console.log("MAIN RANGE AFTER GRAB: ", mainRange);

        let bookingsList = `*${CURR_MONTH} TT Bookings for ${company}:*\n`;

        // const allBookings = data.filter(monthReturner).reverse();

        const monthBookings = monthSeparator(data, MONTH_SEP);

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
    goldPrice2().then((price) => {
      message.reply(`Current Price: $${price}`);
    });
  }

  if (message.body.toLowerCase() === "!pp") {
    goldPrice2().then((price) => {
      message.reply(`Current Price: $${price}`);
    });
  }

  // 6572 sarraj *
  // 6950 om *
  // 1317 maharani *
  // 1299 new marhaba *
  // 1393 kenz *
  // 9643 Munther *
  // 9236 Chandni *
  // 9473 Sudeep *
  // 5784 Mukesh
  // 5016 Mattathil *

  //1293 Al-Jalal Jewellery 0 *
  //9152 Al-Arefi Jewellery N/A
  //1124 Dinesh Devji Jewellers -1 *
  //5324 Dilu Jewellery -1 *
  //1175  Alaa Jewellery 0 *
  //6309 Liberty Jewellery 0 *
  //9325 Shahzaib Jewellers -1 *
  //4841 FAIZA JEWELLERY 0 *
  //6555  Evershine Jewellery -2 *
  //4897 FAREEDA JEWELLERY 0 *
  //4496 J AND P JEWELLERS -2 *

  //8293 Jasra +2
  //1152 Sona +2

  //ghondras 0
  //prakash 0

  if (message.body.toLowerCase() === "!tt") {
    // if (
    //   message.from === NEW_MARHABA_GROUP ||
    //   message.from === EVERSHINE_GROUP ||
    //   message.from === JP_GROUP ||
    //   message.from === MUNTHER_GROUP ||
    //   message.from === CHANDNI_GROUP ||
    //   message.from === MUKESH_GROUP
    // ) {
    //   TT_PREMIUM = 1;
    // } else if (message.from === KENZ_GROUP || message.from === MAHARANI_GROUP) {
    //   console.log("MESSAGE FROM KENZ");
    //   TT_PREMIUM = 1;
    // } else if (
    //   message.from === AL_SARRAJ_GROUP ||
    //   message.from === OM_GROUP ||
    //   message.from === JALAL_GROUP ||
    //   message.from === ALAA_GROUP ||
    //   message.from === LIBERTY_GROUP ||
    //   message.from === FAIZA_GROUP ||
    //   message.from === FAREEDA_GROUP ||
    //   message.from === CHEMMANUR_GROUP
    // ) {
    //   TT_PREMIUM = 1;
    // } else if (
    //   message.from === SUDEEP_GROUP ||
    //   message.from === MATTATHIL_GROUP ||
    //   message.from === DDEVJI_GROUP ||
    //   message.from === DILU_GROUP ||
    //   message.from === SHAHZAIB_GROUP ||
    //   message.from === GORDHANDAS_GROUP ||
    //   message.from === PRAKASH_GROUP
    // ) {
    //   TT_PREMIUM = 1;
    // } else if (message.from === JASRA_GROUP || message.from === SONA_GROUP) {
    //   TT_PREMIUM = +1;
    // } else if (message.from === YAFIE_GROUP) {
    //   TT_PREMIUM = +1;
    // }

 

    goldPrice2().then((price) => {
      if (isNaN(TT_PREMIUM)) {
        message.reply(
          "Application error.\nSorry, someone from our team will respond to your query now."
        );
      } else {

        if (message.from === ALSEEF_GROUP || message.from === MASHALLAH_GROUP || message.from === NEW_MASHALLAH_GROUP) {
          const ttRate =
          (price + PRICE_CORRECTOR) * 1.417;
        const ttPrice = Math.floor(ttRate) - 3;
        message.reply(
          `Current TT Rate: *BD${ttPrice}*`
        );
        } else {
          const ttRate =
          (price + PRICE_CORRECTOR) * 1.417;
        const ttPrice = Math.round(ttRate) + TT_PREMIUM;
        message.reply(
          `Current TT Rate: *BD${ttPrice}*`
        );
        }
       
      }
    });
  }

  if (message.body.toLowerCase().includes("!fix")) {
    const chat = await message.getChat();

    // 6572 sarraj
    // 6950 om
    // 1317 maharani
    // 1299 new marhaba
    // 1393 kenz
    // 9643 Munther
    // 9236 Chandni
    // 9473 Sudeep
    // 5784 Mukesh
    // 5016 Mattathil

    //1293 Al-Jalal Jewellery 0 *
    //9152 Al-Arefi Jewellery N/A
    //1124 Dinesh Devji Jewellers -1 *
    //5324 Dilu Jewellery -1 *
    //1175  Alaa Jewellery 0 *
    //6309 Liberty Jewellery 0 *
    //9325 Shahzaib Jewellers -1 *
    //4841 FAIZA JEWELLERY 0 *
    //6555  Evershine Jewellery -2 *
    //4897 FAREEDA JEWELLERY 0 *
    //4496 J AND P JEWELLERS -2 *

    //8293 Jasra +2
    //1152 Sona +2

    let fixingCode = "";
    const input = message.body.trim().toLowerCase();

    let randTT = Math.ceil(Math.random() * 10);

    if (input.length < 5 || input.length > 10) {
      message.reply(
        `${redXEmoji} Error\n\nPlease use correct format\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
      );
    } else {
      newFlag = false;
      if (message.from === MAHARANI_GROUP) {
        fixingCode = "#1317";
      } else if (message.from === NEW_MARHABA_GROUP) {
        fixingCode = "#1299";
      } else if (message.from === KENZ_GROUP) {
        console.log("MESSAGE FROM KENZ");

        fixingCode = "#1393";
      } else if (message.from === AL_SARRAJ_GROUP) {

        fixingCode = "#6572";
      } else if (message.from === OM_GROUP) {

        fixingCode = "#6950";
        newFlag = false;
      } else if (message.from === MUNTHER_GROUP) {
  
        fixingCode = "#9643";
      } else if (message.from === CHANDNI_GROUP) {

        fixingCode = "#9236";
        newFlag = false;
      } else if (message.from === SUDEEP_GROUP) {

        fixingCode = "#9473";
      } else if (message.from === MUKESH_GROUP) {

        fixingCode = "#5784";
        newFlag = false;
      } else if (message.from === MATTATHIL_GROUP) {
   
        fixingCode = "#5016";
        newFlag = false;
      } else if (message.from === JALAL_GROUP) {
     
        fixingCode = "#1293";
      } else if (message.from === DDEVJI_GROUP) {
       
        fixingCode = "#1124";
      } else if (message.from === DILU_GROUP) {
     
        fixingCode = "#5324";
      } else if (message.from === ALAA_GROUP) {
        
        fixingCode = "#1175";
      } else if (message.from === LIBERTY_GROUP) {
        fixingCode = "#6309";
      } else if (message.from === SHAHZAIB_GROUP) {
        fixingCode = "#9325";
      } else if (message.from === FAIZA_GROUP) {
        fixingCode = "#4841";
        newFlag = true;
      } else if (message.from === EVERSHINE_GROUP) {
        fixingCode = "#6555";
      } else if (message.from === FAREEDA_GROUP) {
        fixingCode = "#4897";
        newFlag = true;
      } else if (message.from === JP_GROUP) {
        fixingCode = "#4496";
        newFlag = true;
      } else if (message.from === CHEMMANUR_GROUP) {
        fixingCode = "#4472";
        newFlag = true;
      } else if (message.from === JASRA_GROUP) {
        fixingCode = "#8293";
        newFlag = true;
      } else if (message.from === SONA_GROUP) {
        fixingCode = "#1152";
        newFlag = true;
      } else if (message.from === DUMMY_SARAJ) {
        fixingCode = "#0101";
        newFlag = true;
      } else if (message.from === GORDHANDAS_GROUP) {
        fixingCode = "#6506";
        newFlag = true;
      } else if (message.from === PRAKASH_GROUP) {
        fixingCode = "#1191";
        newFlag = true;
      } else if (message.from === YAFIE_GROUP) {
        fixingCode = "#4675";
      } else if (message.from === AGK_GROUP) {
        fixingCode = "#1234";
      } else if (message.from === ALSEEF_GROUP) {
        fixingCode = "#4046";
      } else if (message.from === MASHALLAH_GROUP) {
        fixingCode = "#5769";
      }
      const quantity = getQuantity(message.body);

      if (input !== `!fix ${quantity} tt` || quantity <= 0) {
        message.reply(
          `${redXEmoji} Error\n\nPlease use correct format.\n\nTo fix ${randTT} TT you will type:\n\n*!fix ${randTT} TT*`
        );
      } else if (quantity > 20) {
        message.reply(
          `${redXEmoji} Sorry, you can only fix a maximum 20TT in one order.\n\nIf you want to fix more than 20 TT please start another order immediately after.`
        );
      } else {
        goldPrice2().then((price) => {
          if (isNaN(TT_PREMIUM)) {
            message.reply(
              "Sorry, we are unable to process your request at this time.\nSomeone from our team will now process your order manually. "
            );
          } else {
            console.log(TT_PREMIUM);


            const ttRate =
              (price + PRICE_CORRECTOR) * 1.417;

           
            let ttPrice;

            if (message.from === ALSEEF_GROUP || message.from === MASHALLAH_GROUP || message.from === NEW_MASHALLAH_GROUP) {
              ttPrice = Math.floor(ttRate) - 3;
            } else {
               ttPrice = Math.round(ttRate) + TT_PREMIUM;
            }
          
          

            const totalPrice = quantity * ttPrice;
            const totalPriceFormatted = numberWithCommas(totalPrice);

            if (newFlag) {
              grabPic().then((pic) => {
                chat.sendMessage(pic);
                message.reply(
                  `*REVIEW PRICE THEN CONFIRM:*\n\nOrder to fix ${quantity} TT at *BD${ttPrice}* each.\n\nTotal = *BD${totalPriceFormatted}*\n\nTo complete the order swipe right on this message and enter your 4-digit PIN code within *60 seconds*.\n\nAfter 60 seconds your order price will expire then you have to start a new order.\n\nYour fixing code is *${fixingCode}*, please include the # symbol.`
                );
              });
            } else if (!chat.isGroup) {
              grabPic().then((pic) => {
                chat.sendMessage(pic);
                message.reply(
                  `*REVIEW PRICE THEN CONFIRM:*\n\nOrder to fix ${quantity} TT at *BD${ttPrice}* each.\n\nTotal = *BD${totalPriceFormatted}*\n\nTo complete the order swipe right on this message and enter your 4-digit PIN code within *60 seconds*.\n\nAfter 60 seconds your order price will expire then you have to start a new order.\n\nAs this is not a group, you may use our Dummy Code to see how it works: *#0001*.`
                );
              });
            } else {
              message.reply(
                `*REVIEW PRICE THEN CONFIRM:*\n\nOrder to fix ${quantity} TT at *BD${ttPrice}* each.\n\nTotal = *BD${totalPriceFormatted}*\n\nTo complete the order swipe right on this message and enter your 4-digit PIN code within *60 seconds*.\n\nAfter 60 seconds your order price will expire then you have to start a new order.\n\nYour fixing code is *${fixingCode}*, please include the # symbol.`
              );
            }
          }
        });
      }
    }
  } // end of if !fix if/else

  if (isACode(message.body) && !message.hasQuotedMsg) {
    message.reply(
      `${redXEmoji} Error.\n\nYou did not quote reply to an order message.\n\nPlease swipe right on the order message above and then reply with your fixing code.`
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
      // 5784 Mukesh
      // 5016 Mattathil
      if (message.body === "#6572") {
        fixerName = "Al Sarraj Jewellers";
      } else if (message.body === "#6950") {
        fixerName = "Om Jewellery";
      } else if (message.body === "#0001") {
        fixerName = "DUMMY ORDER";
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
      } else if (message.body === "#5784") {
        fixerName = "Mukesh & Brothers";
      } else if (message.body === "#5016") {
        fixerName = "Mattathil Jewellers";
      } else if (message.body === "#1293") {
        fixerName = "Al-Jalal Jewellers";
      } else if (message.body === "#1124") {
        fixerName = "Dinesh Devji Jewellers";
      } else if (message.body === "#5324") {
        fixerName = "Dilu Jewellery";
      } else if (message.body === "#1175") {
        fixerName = "Alaa Jewellery";
      } else if (message.body === "#6309") {
        fixerName = "Liberty Jewellery";
      } else if (message.body === "#9325") {
        fixerName = "Shahzaib Jewellery";
      } else if (message.body === "#4841") {
        fixerName = "Faiza Jewellery";
      } else if (message.body === "#6555") {
        fixerName = "Evershine Jewellery";
      } else if (message.body === "#4897") {
        fixerName = "Fareeda Jewellery";
      } else if (message.body === "#4496") {
        fixerName = "J and P Jewellers";
      } else if (message.body === "#4472") {
        fixerName = "Chemmanur Jewellers";
      } else if (message.body === "#8293") {
        fixerName = "Al Jasrah Jewellers";
      } else if (message.body === "#1152") {
        fixerName = "Sonaj Jewellers";
      } else if (message.body === "#1234") {
        fixerName = "AGK Jewellers";
      } else if (message.body === "#6506") {
        fixerName = "Gordhandas Jewellers";
      } else if (message.body === "#1191") {
        fixerName = "Prakash Jewellery";
      } else if (message.body === "#4675") {
        fixerName = "Al Yafie Jewelleries";
      } else if (message.body === "#4046") {
        fixerName = "Al Seef Jewellery";
      } else if (message.body === "#5769") {
        fixerName = "Mashallah Group";
      }
 
      message
        .getQuotedMessage()
        .then((quoted) => {
          let quantity = 0;
          let unitPrice = 0;
          const group = quoted.to;

          const groupID = chat.from;

          if (quoted.body.length < 35) {
            message.reply(
              `${redXEmoji} Error.\n\nYou did not quote reply to an order message.\n\nPlease swipe right on your order message and then enter your fixing code.`
            );
            return;
          }

          if (quoted.body.slice(44, 45) === " ") {
            quantity = parseInt(quoted.body.slice(43, 44));
          } else {
            quantity = parseInt(quoted.body.slice(43, 45));
          }

          if (quantity >= 10) {
            unitPrice = parseInt(quoted.body.slice(55, 59));
          } else {
            unitPrice = parseInt(quoted.body.slice(54, 58));
          }

          if (isNaN(quantity)) {
            message.reply(
              "Calculation error, please try again.\nIf error occurs again, somebody from our team will fix your TT manually."
            );
            return;
          }

          if (isNaN(unitPrice)) {
            message.reply(
              "Calculation error, please try again.\nIf error occurs again, somebody from our team will fix your TT manually."
            );
            return;
          }

          if (quantity >= 16) {
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
            !quoted.body.startsWith("*REVIEW PRICE THEN CONFIRM:*") ||
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

          if (diff > 60000) {
            message.reply(
              `${redXEmoji} You did not complete your order within the 60 second time limit.\n\nPlease start a new order again.`
            );
          } else {
            message.reply(
              `Confirmed for *${fixerName}* ${greenTickEmoji}\n\n${quantity} TT fixed at BD${unitPrice} each.\n\n*Total = BD${numberWithCommas(
                unitPrice * quantity
              )}*\n\n*This message is your confirmation and proof of booking.* ${greenTickEmoji}\n\nThank you!`
            );
            client.sendMessage(
              sajeevNumber,
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
            client.sendMessage(
              zubairNumber,
              `${redCircle} Fixing Alert ${redCircle}\n\n${fixerName} just booked ${quantity} TT at BD${unitPrice} each.\n\nTotal = BD${numberWithCommas(
                unitPrice * quantity
              )}.\n\nUpdate Daily Fixing Sheet.`
            );
          }
        })
        .catch((err) => {
          message.reply(
            "Sorry, we could not process your fixing order due to an error. Someone from our team will process your order manually."
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
    // const chat = await message.getChat();
    // if (
    //   message.from === "97333737302@c.us" ||
    //   message.from === "97338999888@c.us"
    // ) {
    message.reply(`Current Premium: BD${TT_PREMIUM}`);
    // } else {
    //   message.reply("Not authorized.");
    // }
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