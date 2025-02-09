function generatePifagorTable(size) {
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");

  let cornerTh = document.createElement("th");
  cornerTh.textContent = "*";
  headerRow.appendChild(cornerTh);

  for (let i = 1; i <= size; i++) {
    let th = document.createElement("th");
    th.textContent = i;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  for (let i = 1; i <= size; i++) {
    let row = document.createElement("tr");

    let rowHeader = document.createElement("th");
    rowHeader.textContent = i;
    row.appendChild(rowHeader);

    for (let j = 1; j <= size; j++) {
      let cell = document.createElement("td");
      cell.textContent = i * j;
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  return table;
}

document.getElementById("pifagor-table").appendChild(generatePifagorTable(10));
