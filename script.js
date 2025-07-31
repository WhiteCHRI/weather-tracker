
let selectedTerm = '';
let entries = [];

function selectTerm(term) {
  selectedTerm = term;
  document.getElementById("status").innerText = `Viewing: ${term}`;
}

function saveEntry() {
  const date = document.getElementById("date").value;
  const maxTemp = document.getElementById("maxTemp").value;
  const minTemp = document.getElementById("minTemp").value;
  const rainChance = document.getElementById("rainChance").value;
  const forecast = document.getElementById("weather").value;
  const chanceWord = document.getElementById("chance").value;

  if (!date || !forecast || !maxTemp || !minTemp || !rainChance || !chanceWord) {
    alert("Please fill in all fields.");
    return;
  }

  entries.push({
    date,
    term: selectedTerm,
    maxTemp,
    minTemp,
    rainChance,
    forecast,
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
  document.getElementById("weather").selectedIndex = 0;
  document.getElementById("chance").selectedIndex = 0;
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

function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.trim().split("\n");
    const rows = lines.slice(1).map(line => line.split(","));

    const tableBody = document.querySelector("#importedTable tbody");
    tableBody.innerHTML = "";

    rows.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });

    document.getElementById("status").innerText = "✅ CSV imported and displayed.";
  };
  reader.readAsText(file);
}
