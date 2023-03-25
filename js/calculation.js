var data = [[], [], []];
var typeOptions = ["4 * 2", "3 * 2", "5 * 3"];

function buttonAction() {
  var lengthChange = Number(document.getElementById("length").value);
  var pieceCountChange = Number(document.getElementById("pCount").value);
  if (!lengthChange || !pieceCountChange) {
    return document.getElementById("add-btn").setAttribute("disabled", true);
  }
  return document.getElementById("add-btn").removeAttribute("disabled");
}

function createTable() {
  var length = Number(document.getElementById("length").value);
  var pieceCount = Number(document.getElementById("pCount").value);
  if (!length || !pieceCount) {
    return;
  }

  var typeValue = Number(document.getElementById("type").value);
  var optionType = document.getElementById("type");
  var selectedOption = optionType.selectedIndex;
  var type = optionType[selectedOption].dataset.optionType;
  var total = (length * typeValue * pieceCount) / 144;
  data[selectedOption].push({
    length,
    type,
    pieceCount,
    total,
  });
  $(document).ready(function () {
    var table = $("table").DataTable({
      paging: false,
      searching: false,
      info: "",
      dom: "Bfrtip",
      buttons: [
        {
          extend: "pdfHtml5",
          pageSize: "A4",
          alignment: "center",
          customize: function (doc) {
            doc.styles.tableHeader.alignment = "left";
            doc.styles.tableHeader.padding = "0.5rem";
            doc.styles.tableHeader.margin =
              doc.styles.tableBodyOdd.margin =
              doc.styles.tableBodyEven.margin =
                [10, 10, 10, 10];
            doc.content[1].table.widths = Array(
              doc.content[1].table.body[0].length + 1
            )
              .join("*")
              .split("");
          },
        },
      ],
    });
  });

  tableGeneration();
  document.getElementById("myForm").reset();
  document.getElementById("add-btn").setAttribute("disabled", true);
}

function clearLen() {
  let inputLength = document.getElementById("length");
  inputLength.value = inputLength.value.slice(0, -1);
}
function clearPcs() {
  let inputLength = document.getElementById("pCount");
  inputLength.value = inputLength.value.slice(0, -1);
}

function tableGeneration() {
  var fullTable = "";
  var totalCf = 0;

  data.forEach((currentTable, index) => {
    if (currentTable.length) {
      var totalCF = 0;
      let tableGenerate =
        `<div><span class="type">Type - ` +
        typeOptions[index] +
        `</span><table width="100%" class="table table-dark table-hover mt-2">
  <thead>
  <tr style="text-align:left">
	  <th>Length</th>
	  <th>Type</th>
	  <th>Piece Count</th>
	  <th>Total</th>
	  </tr>
  </thead>
  <tbody>`;

      for (let { length, type, pieceCount, total } of currentTable) {
        totalCF += total;
        tableGenerate +=
          `<tr style="text-align:left">
	<td>` +
          length +
          `</td>
	<td>` +
          type +
          `</td>
	<td>` +
          pieceCount +
          `</td>
	  <td>` +
          total.toFixed(2) +
          `</td>
  </tr>`;
      }
      tableGenerate +=
        `</tbody>
    </table> <p style="margin-bottom:1rem">This Table Total <b>` +
        totalCF.toFixed(2) +
        `</b></p></div>`;

      fullTable += tableGenerate;
      totalCf += totalCF;
    }
  });

  document.getElementById("tableGenerate").innerHTML = fullTable;
  document.getElementById("totalcf").innerHTML =
    "Your Total CF --- " + totalCf.toFixed(2);
}

function clickedLengthValue(value) {
  let inputLength = document.getElementById("length");
  inputLength.value = inputLength.value + value;
  buttonAction();
}
function clickedPcsValue(value) {
  let inputLength = document.getElementById("pCount");
  inputLength.value = inputLength.value + value;
  buttonAction();
}

function createButtons() {
  let lengthBtn = "";
  let pcsBtn = "";

  for (let i = 0; i <= 9; i++) {
    lengthBtn +=
      "<button id='btn' type='button' class='btns number' onclick=clickedLengthValue(" +
      i +
      ")>" +
      i +
      "</button>";
  }
  lengthBtn +=
    "<button id='btn' type='button' class='btns number' onclick=clickedLengthValue('.')>&#8226;</button><button id='btn' type='button' class='btns number clear-btn' onclick=clearLen()>CE</button>";

  for (let i = 0; i <= 9; i++) {
    pcsBtn +=
      "<button id='btn' type='button' class='btns number' onclick=clickedPcsValue(" +
      i +
      ")>" +
      i +
      "</button>";
  }
  pcsBtn +=
    "<button id='btn' type='number' class='btns number' onclick=clickedPcsValue('.')>&#8226;</button><button id='btn' type='button' class='btns number clear-btn' onclick=clearPcs()>CE</button>";
  document.getElementById("lencontainer").innerHTML = lengthBtn;
  document.getElementById("pcscontainer").innerHTML = pcsBtn;
}
