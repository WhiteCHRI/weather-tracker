
let selectedForecast = '';
let selectedTerm = '';
let entries = [];

function selectForecast(type) {
  selectedForecast = type;
  document.getElementById("status").innerText = `Forecast set to: ${type}`;
}

function selectTerm(term) {
  selectedTerm = term;
  document.getElementById("status").innerText = `Viewing: ${term}`;
}

function saveEntry() {
  const date = document.getElementById("date").value;
  const maxTemp = document.getElementById("maxTemp").value;
  const minTemp = document.getElementById("minTemp").value;
  const rainChance = document.getElementById("rainChance").value;
  const chanceWord = document.getElementById("chanceWord").value;

  if (!date || !selectedForecast || !maxTemp || !minTemp || !rainChance || !chanceWord) {
    alert("Please fill in all fields and select a forecast.");
    return;
  }

  entries.push({
    date,
    term: selectedTerm,
    maxTemp,
    minTemp,
    rainChance,
    forecast: selectedForecast,
    chanceWord
  });

  document.getElementById("status").innerText = "✅ Entry saved!";
  clearInputs();
}

function clearInputs() {
  document.getElementById("date").value = '';
  document.getElementById("maxTemp").value = '';
  document.getElementById("minTemp").value = '';
  document.getElementById("rainChance").value = '';
  document.getElementById("chanceWord").value = '';
  selectedForecast = '';
}

function downloadCSV() {
  let csv = "Date,Term,Max Temp,Min Temp,Chance %,Forecast,Chance Word\n";
  entries.forEach(e => {
    csv += `${e.date},${e.term},${e.maxTemp},${e.minTemp},${e.rainChance},${e.forecast},${e.chanceWord}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "weather_data.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
