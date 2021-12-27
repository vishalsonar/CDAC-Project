let rowCount = 1;
let columnCount = 0;
let localCount = 0;

document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchTable();
    }
});

onload = function () {
    let table = document.getElementById("dataTable");
    let row = table.insertRow(rowCount);
    for (let key in localStorage) {
        if (key.includes("Resistor_Table_") || key.includes("_Table_")) {
            localCount++;
        }
    }
    for (let key in this.localStorage)
        if (key.includes("Resistor_Table_") || key.includes("_Table_")) {
            if (columnCount > 2) {
                columnCount = 0;
                rowCount++;
                row = table.insertRow(rowCount);
            }
            let column = row.insertCell(columnCount);
            if (columnCount == 0) {
                column.colSpan = 3;
            }
            if (columnCount == 1) {
                table.rows[rowCount].cells[0].colSpan = 1;
                column.colSpan = 2;
            }
            if (columnCount == 2) {
                for (let v = 0; v < 2; v++)
                    table.rows[rowCount].cells[v].colSpan = 1;
            }
            if (key.includes("Resistor_Table_")) {
                createColumn(key.substr(15, key.length), column);
                columnCount++;
                continue;
            }
            if (key.includes("_Table_"))
                createCampare(key.substr(7, key.length), column);
            columnCount++;
        }

    if (localCount == 0) {
        let column = row.insertCell(columnCount);
        column.colSpan = 3;
        column.innerHTML = "No Data Found <a href='./insert.html' style='color:black;'>"
            + "Click here to insert data</a>";
    }
}

createColumn = function () {
    arguments[1].innerHTML = "<p style='text-shadow: 1px 1px 20px black;font-size:20px;'>"
        + arguments[0]
        + "</p>"
        + "<input type='button' value='delete' onclick='deleteTable(this.id)' id='"
        + arguments[0]
        + "' class='clearLink'/>"
        + "<input type='button' value= 'update' onclick='updateTable(this.id)' id='"
        + arguments[0]
        + "' class= 'clearLink'/>"
        + "<input type='button' value='view' onclick='viewTable(this.id)' id='"
        + arguments[0] + "_view"
        + "' class='viewLink'/>";
}

createCampare = function () {
    arguments[1].innerHTML = "<p style='text-shadow: 1px 1px 20px black;font-size:20px;'>"
        + arguments[0]
        + "</p>"
        + "<input type='button' value='delete' onclick='deleteTable(this.id)' id='"
        + arguments[0]
        + "' class='clearLink'/>"
        + "<input type='button' value='view' onclick='viewTable(this.id)' id='"
        + arguments[0] + "_cmpg"
        + "' class='viewLink'/>";
}

updateTable = function () {
    sessionStorage.setItem("updateTable", arguments[0]);
    location.href = "./insert.html";
}

deleteTable = function () {
    let tableNameDelete = arguments[0];
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure you want to delete this Table?',
        buttons: {
            confirm: function () {
                if (localStorage.getItem("Resistor_Table_" + tableNameDelete))
                    localStorage.removeItem("Resistor_Table_" + tableNameDelete);
                if (localStorage.getItem("_Table_" + tableNameDelete))
                    localStorage.removeItem("_Table_" + tableNameDelete);
                window.location.reload();
            },
            cancel: function () {
            }
        }
    });
}

deleteTableRow = function () {
    let tableRow = document.getElementById("modalTable").rows.length;
    for (let i = tableRow - 1; i > 0; i--)
        document.getElementById("modalTable").deleteRow(i);
}

viewTable = function () {
    let name = arguments[0];
    let tabelName = name.substr(0, arguments[0].length - 5);
    if (name.includes("_view")) {
        sessionStorage.setItem("ShowTable", "Resistor_Table_" + tabelName);
    }
    if (name.includes("_cmpg")) {
        sessionStorage.setItem("ShowCampare", "_Table_" + tabelName);
    }
    location.href = "./view.html";
}

searchTable = function () {
    rowCount = 0;
    columnCount = 8;
    let query = document.getElementById("searchValue").value;
    let table = document.getElementById("dataTable");
    let deleteFlag = true;
    if (query) {
        for (let key in this.localStorage) {
            if (key.includes("Resistor_Table_") || key.includes("_Table_")) {
                if (key.toLowerCase().includes(query.toLowerCase())) {
                    if (deleteFlag) {
                        deleteFlag = false;
                        for (var x = table.rows.length - 1; x > 0; x--) {
                            table.deleteRow(x);
                        }
                    }
                    if (columnCount > 2) {
                        columnCount = 0;
                        rowCount++;
                        row = table.insertRow(rowCount);
                    }
                    let column = row.insertCell(columnCount);
                    if (columnCount == 0) {
                        column.colSpan = 3;
                    }
                    if (columnCount == 1) {
                        table.rows[rowCount].cells[0].colSpan = 1;
                        column.colSpan = 2;
                    }
                    if (columnCount == 2) {
                        for (let v = 0; v < 2; v++)
                            table.rows[rowCount].cells[v].colSpan = 1;
                    }
                    createColumn(key.substr(15, key.length), column);
                    if (key.includes("Resistor_Table_")) {
                        createColumn(key.substr(15, key.length), column);
                        columnCount++;
                        continue;
                    }
                    if (key.includes("_Table_"))
                        createCampare(key.substr(7, key.length), column);
                    columnCount++;
                }
            }
        }
    }
    if (deleteFlag == true) {
        //alert("No Search Result Found");
        $().toastmessage('showToast', {
            text: 'No Search Result Found',
            sticky: false,
            position: 'top-right',
            stayTime: 3000,
            type: 'notice',
            close: function () { }
        });
    }
}