let selectbtn = document.getElementById("selectbtn");
let courntryName = document.getElementById("courntryName");
let courntryFlagimg = document.getElementById("courntryFlagimg");
let countryOfficial = document.getElementById("countryOfficial");
let countryHindi = document.getElementById("countryHindi");
let countryCapital = document.getElementById("countryCapital");
let countryContinents = document.getElementById("countryContinents");
let countryArea = document.getElementById("countryArea");
let countryMaps = document.getElementById("countryMaps");
let countryTimezones = document.getElementById("countryTimezones");
let countryIndependent = document.getElementById("countryIndependent");
let countryUNMember = document.getElementById("countryUNMember");
let countryCurrencies = document.getElementById("countryCurrencies");
let countryIDD = document.getElementById("countryIDD");
let countryRegionSubregion = document.getElementById("countryRegionSubregion");
let countryPopulation = document.getElementById("countryPopulation");
let countryBorderCountry = document.getElementById("countryBorderCountry");
let errordatacard = document.getElementById("error-data-card");
let maindatacard = document.getElementById("main-data-card");
let selectCountryinput = document.getElementById("selectCountry");
let pageloader = document.getElementById("pageloader");

function getCountryDataspacific() {
  let countrydata = new XMLHttpRequest();
  let selectCountry = document.getElementById("selectCountry").value.trim();
  countrydata.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      errordatacard.textContent = "Country Data is successfully loaded.";
      errordatacard.style.background = "green";
      errordatacard.style.display = "block";
      setTimeout(function () {
        errordatacard.style.display = "none";
      }, 2000);
      maindatacard.style.display = "block";
      //   console.log(data);

      courntryName.textContent = data[0].name.common;
      courntryFlagimg.src = data[0].flags.png;
      let nativeName = data[0].name.nativeName;
      countryOfficial.textContent = data[0].name.official;
      let commonNamearr = [];
      for (let langCode in nativeName) {
        if (nativeName.hasOwnProperty(langCode)) {
          let commonName = nativeName[langCode].common;
          commonNamearr.push(commonName);
        }
      }
      countryHindi.textContent = commonNamearr.join(" ");
      countryCapital.textContent = data[0].capital[0];
      countryContinents.textContent = data[0].continents[0];
      countryArea.textContent = data[0].area;
      countryMaps.href = data[0].maps.googleMaps;
      countryTimezones.textContent = data[0].timezones[0];
      if (data[0].independent) {
        countryIndependent.textContent = "yes";
      } else {
        countryIndependent.textContent = "no";
      }
      if (data[0].unMember) {
        countryUNMember.textContent = "yes";
      } else {
        countryUNMember.textContent = "no";
      }
      for (let currencyCode in data[0].currencies) {
        if (data[0].currencies.hasOwnProperty(currencyCode)) {
          let currencyData = data[0].currencies[currencyCode];
          countryCurrencies.textContent = `${currencyCode} ${currencyData.symbol} (${currencyData.name})\n`;
        }
      }
      countryIDD.textContent = data[0].idd.root + data[0].idd.suffixes[0];
      countryRegionSubregion.textContent = `${data[0].region}  / ${data[0].subregion}`;
      let Census;
      if (data[0].gini) {
        for (Census in data[0].gini) {
          if (data[0].gini.hasOwnProperty(Census)) {
          }
        }
      } else {
        Census = "Not Available";
      }
      countryPopulation.textContent = `${data[0].population} (${Census}) `;
      countryBorderCountry.textContent = data[0].borders;
    } else if (this.status == 404) {
      errordatacard.textContent = "Error 404. Please check your api.";
      errordatacard.style.background = "red";
      errordatacard.style.display = "block";
      setTimeout(function () {
        errordatacard.style.display = "none";
      }, 2000);
    } else {
      errordatacard.style.display = "none";
    }
  });
  countrydata.open(
    "GET",
    `https://restcountries.com/v3.1/name/${selectCountry}`,
    true
  );
  countrydata.send();
}

function getCountryData() {
  let country = new XMLHttpRequest();
  country.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && this.status === 200) {
      let dataall = JSON.parse(this.responseText);
      dataall.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        selectCountryinput.appendChild(option);
      });
    }
  });
  country.open("GET", `https://restcountries.com/v3.1/all`, true);
  country.send();
}

selectCountryinput.addEventListener("click", function () {
  getCountryData();
});
selectbtn.addEventListener("click", function () {
  pageloader.style.display = "block";
  setTimeout(() => {
    pageloader.style.display = "none";
    getCountryDataspacific();
  }, 2000);
});
