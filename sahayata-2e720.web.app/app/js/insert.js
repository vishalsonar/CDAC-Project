var dataTable = null;
var jsonObject = null;
let resisterUpperMargin;
let resisterLowerMargin;
let ppmUpperMargin = 15;
let ppmLowerMargin = -15;
let absoluteValue;
let updateFlag = false;
let updateTableName;
let updateValue;
let toUpdateId;
let oldData;

onload = function () {
    let needUpdate = sessionStorage.getItem("updateTable");
    dataTable = new DataTable("dataTable");
    jsonObject = new JsonObject();
    setFocus("name");

    if (needUpdate) {
        populateTable(needUpdate);
    }
}

populateTable = function () {
    updateFlag = true;
    updateTableName = "Resistor_Table_" + arguments[0];
    let list = JSON.parse(localStorage.getItem(updateTableName)).tableData;
    updateValue = list[list.length - 1].actualValue;
    list.pop();
    document.getElementById("name").value = updateValue;
    for (let data in list) {
        dataTable.insert(list[data].id, list[data].value, list[data].ppm);
        jsonObject.insert(list[data].id, list[data].value, list[data].ppm);
    }
    sessionStorage.removeItem("updateTable");
    updateMargin();
    document.getElementById("totalId").innerHTML = "Total Count: " + dataTable.getCount();
}

updateMargin = function () {
    absoluteValue = getValue("name");
    if (absoluteValue) {
        resisterUpperMargin = Number(absoluteValue) + (Number(absoluteValue) * Number(0.2 / 100));
        resisterLowerMargin = Number(absoluteValue) - (Number(absoluteValue) * Number(0.35 / 100));
        disable("setValue");
        disable("name");
        setFocus("id");
    }
}

disable = function () {
    document.getElementById(arguments[0]).disabled = true;
}

insert = function () {
    if (absoluteValue) {
        let id = getValue("id");
        let value = getValue("value");
        let ppm = getValue("ppm");

        if (id != "" && value != "" && ppm != "") {
            if (dataTable.insert(id, value, ppm)) {
                document.getElementById("totalId").innerHTML = "Total Count: " + dataTable.getCount();
                if (comparePpm(ppm))
                    if (compareRange(value)) {
                        jsonObject.insert(id, value, ppm);
                    }
                resetInput();
            }
        } else {
            showToastMessage("warning", "Some Fields are Empty");
        }
    } else {
        showToastMessage("warning", "Please Enter Absolute value");
    }
}

compareRange = function () {
    let x = arguments[0];
    if (x <= resisterUpperMargin)
        if (x >= resisterLowerMargin)
            return true;
    return false;
}

comparePpm = function () {
    let x = arguments[0];
    if (x <= ppmUpperMargin)
        if (x >= ppmLowerMargin)
            return true;
    return false;
}

remove = function () {
    dataTable.remove();
    jsonObject.remove();
    document.getElementById("totalId").innerHTML = "Total Count: " + dataTable.getCount();
    resetInput();
}

getValue = function () {
    return document.getElementById(arguments[0]).value;
}

setEmpty = function () {
    document.getElementById(arguments[0]).value = "";
}

setFocus = function () {
    document.getElementById(arguments[0]).focus();
}

resetInput = function () {
    setEmpty("id");
    setEmpty("value");
    setEmpty("ppm");
    setFocus("id");
}

saveData = function () {
    if (updateFlag) {
        jsonObject.actualValue(updateValue);
        localStorage.setItem(updateTableName, jsonObject.getString());
        showToastMessageAndReload("Table is Updated");
    } else {
        if (dataTable.getCount() != 0) {
            let name = getValue("name");
            if (name != "") {
                //let tableName = prompt("Please Enter Table Name : ");
                let tableName = document.getElementById("tableName_1").value;
                if (tableName) {
                    jsonObject.actualValue(name);
                    localStorage.setItem("Resistor_Table_" + tableName, jsonObject.getString());
                    showToastMessageAndReload("Table is Saved");
                } else {
                    showToastMessage("warning", "Please Enter Table Name");
                }
            }
        } else {
            showToastMessage("error", "Unable to Save Table, No Data Found");
        }
    }
}

function showToastMessage(messageType, messageText) {
    $().toastmessage('showToast', {
        text: messageText,
        sticky: false,
        position: 'top-right',
        stayTime: 3000,
        type: messageType,
        close: function () { }
    });
}

function showToastMessageAndReload(messageText) {
    $().toastmessage('showToast', {
        text: messageText,
        sticky: false,
        position: 'top-right',
        stayTime: 1000,
        type: 'success',
        close: function () { window.location.reload(); }
    });
}

function updateRowById(id) {
    let data = dataTable.getRowDataById(id);
    let ids = ["id", "value", "ppm"];
    for (let x = 0; x < 3; x++) {
        setValue(ids[x], data[ids[x]]);
    }
    toUpdateId = data["iId"];
    oldData = data;
}

setValue = function () {
    document.getElementById(arguments[0]).value = arguments[1];
}

function updateRow() {
    if (absoluteValue) {
        let id = getValue("id");
        let value = getValue("value");
        let ppm = getValue("ppm");

        if (id != "" && value != "" && ppm != "") {
            let data = {
                "id": id,
                "value": value,
                "ppm": ppm
            }
            if (dataTable.updateRow(toUpdateId, data)) {
                if (comparePpm(ppm))
                    if (compareRange(value)) {
                        jsonObject.update(oldData, data);
                    }
                resetInput();
            }
        } else {
            showToastMessage("warning", "Some Fields are Empty");
        }
    } else {
        showToastMessage("warning", "Please Enter Absolute value");
    }
}