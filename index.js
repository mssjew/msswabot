const URL_ONE = "1Dv8aUw29Nu5uF3bFJhQzoZGDaiMnwC9W0JBpXRpcRgU";
const URL_TWO = "AIzaSyDmbXdZsgesHy5afOQOZSr9hgDeQNTC6Q4";

const currentDate = document.getElementById("dateToday");

const currentTable = document.getElementById("currentTable");
const monthTable = document.getElementById("monthTable");

const currentTableBody = document.getElementById("currentTableBody");
const monthTableBody = document.getElementById("monthTableBody");

const ttDaily = document.getElementById("dailyTotal");
const ttMonthly = document.getElementById("monthlyTotal");

const dailyTotalSentence = document.getElementById("dailyTotalSummary");


const mainRange = "Kenz_K00010!D2:L101";
const dailyTotal = "Kenz_K00010!A22";
const monthlyTotal = "Kenz_K00010!A24";
const balancePending = "Kenz_K00010!A30";
const dateToday = "Kenz_K00010!A6";

const priceSpan = document.getElementById("livePrice");

const outstandingBalance = document.getElementById("outBalance");

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

const todayReturner = (arr) => {
  return arr[0] === "*";
};

const monthReturner = (arr) => {
  return arr[0] === "";
};

const monthSeparator = (arr) => {
  let retArr = [];
  for(x in arr) {
    if (arr[x][1].includes("Feb")) retArr.push(arr[x]);
  }
  return retArr;
}

const quantityCalc = (arr) => {
  
  let quantArr = [];
  for(x in arr) {
    quantArr.push(arr[x][3])
  }
  
  let retval = 0;
  for(x in quantArr) {
    retval += parseInt(quantArr[x]);
  }

  ttMonthly.textContent = `${retval} TTs`;
  
}

dataGrab(mainRange)
  .then((data) => {
    const dayBookings = data.filter(todayReturner).reverse();
    const monthBookings = data.filter(monthReturner).reverse();

    const febBookings = monthSeparator(monthBookings);

    quantityCalc(febBookings);
    
    if (dayBookings.length === 0) {
      const tableRow = document.createElement("tr");
      currentTableBody.appendChild(tableRow);

      for (let i = 0; i < 8; i++) {
        const cell = document.createElement("td");
        tableRow.appendChild(cell);
        cell.textContent = "---";
      }

      dailyTotalSentence.textContent = "No bookings today.";
      dailyTotalSentence.style.color = "crimson";

      

    }

    dayBookings.forEach((row) => {
      row.shift();
      const tableRow = document.createElement("tr");
      currentTableBody.appendChild(tableRow);
      row.forEach((cellData) => {
        const cell = document.createElement("td");
        tableRow.appendChild(cell);
        cell.textContent = cellData;

        if (cell.textContent === "PENDING") {
          cell.classList.add("pending");
        }
        if (cell.textContent === "COMPLETE") {
          cell.classList.add("complete");
        }
      });
    });

    febBookings.forEach((row) => {
      row.shift();
      const tableRow = document.createElement("tr");
      monthTableBody.appendChild(tableRow);
      row.forEach((cellData) => {
        const cell = document.createElement("td");
        tableRow.appendChild(cell);
        cell.textContent = cellData;

        if (cell.textContent === "PENDING") {
          cell.classList.add("pending");
        }
        if (cell.textContent === "COMPLETE") {
          cell.classList.add("complete");
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

dataGrab(dailyTotal)
  .then((data) => {

    if (data[0][0][1] === " ") console.log("true");

    // console.log(parseInt(data[0][0][0]) + parseInt(data[0][0][1]));
    ttDaily.textContent = data;
  })
  .catch((err) => {
    console.log(err);
  });

dataGrab(balancePending)
  .then((data) => {
    outstandingBalance.textContent = data;
  })
  .catch((err) => {
    console.log(err);
  });

dataGrab(dateToday)
  .then((data) => {
    currentDate.textContent = data;
  })
  .catch((err) => {
    console.log(err);
  });

  var myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-f20pyjatkuagadm4-io"); 
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  
  fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
    .then((response) => response.json())
    .then((result) => (priceSpan.textContent = `$${result.price}`))
    .catch((error) => console.log("error", error));
  