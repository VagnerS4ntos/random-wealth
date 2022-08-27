const info = document.querySelector(".info");
const url = "https://randomuser.me/api";
let data = [];
let i = 0;

/****ADD PERSON ****/
const addUser = document.querySelector(".addUser");
async function fetchPerson() {
  const response = await fetch(url);
  const json = await response.json();

  const random = Math.floor(Math.random() * 1300001) + 300000;

  data.push({
    name: `${json.results[0].name.first} ${json.results[0].name.last}`,
    wealth: random,
  });

  const div = document.createElement("div");
  div.classList.add("individual-info");
  const name = document.createElement("h2");
  name.classList.add("name");
  name.innerText = data[i].name;
  div.appendChild(name);
  info.appendChild(div);

  const fortune = document.createElement("h2");
  fortune.classList.add("fortune");
  fortune.innerText = data[i].wealth.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  div.appendChild(fortune);

  i++;
  calcTotalWealth();
}

addUser.addEventListener("click", () => {
  fetchPerson();
});

/**** UPDATE ****/
function update() {
  const fortuneSelected = document.querySelectorAll(".fortune");
  const names = document.querySelectorAll(".name");
  for (let count = 0; count < data.length; count++) {
    names[count].innerText = data[count].name;
    fortuneSelected[count].innerText = data[count].wealth.toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );
  }
}

/****DOUBLE ****/
const double = document.querySelector(".double");
function getDouble() {
  const fortuneSelected = document.querySelectorAll(".fortune");

  data = data.map((item) => {
    return {
      name: item.name,
      wealth: item.wealth * 2,
    };
  });

  update();
  calcTotalWealth();
}

double.addEventListener("click", getDouble);

/****ONLY MILLIONAIRES ****/
const millionaires = document.querySelector(".millionaires");
function getMillionaires() {
  const individualInfo = document.querySelectorAll(".individual-info");
  const fortuneSelected = document.querySelectorAll(".fortune");
  const names = document.querySelectorAll(".name");
  data = data.filter(function (item) {
    return item.wealth > 1000000;
  });
  i = data.length;

  const newArray = Array.from(individualInfo).splice(
    i,
    individualInfo.length - i
  );
  newArray.forEach((item) => {
    item.remove();
  });

  update();
  calcTotalWealth();
}
millionaires.addEventListener("click", getMillionaires);

/**** SORT ****/

const sort = document.querySelector(".sort");
sort.addEventListener("click", () => {
  const fortuneSelected = document.querySelectorAll(".fortune");
  const names = document.querySelectorAll(".name");
  data.sort((a, b) => {
    return b.wealth - a.wealth;
  });

  update();
});

/**** ENTIRE WEALTH ****/
let totalCount = 0;

function calcTotalWealth() {
  const result = data.reduce((acc, value) => {
    return acc + value.wealth;
  }, 0);

  const div = document.createElement("div");
  div.classList.add("total");
  const total = document.createElement("h2");
  total.innerText = "Total Wealth";
  div.appendChild(total);
  info.appendChild(div);

  const totalFortune = document.createElement("h2");
  totalFortune.innerText = result.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  div.appendChild(totalFortune);

  if (totalCount === 1) {
    document.querySelector(".total").remove();
  }
  totalCount = 1;
}

/**** CLEAR ALL ****/
const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener("click", () => {
  data = [];
  info.innerText = "";
  i = 0;
  totalCount = 0;
});
