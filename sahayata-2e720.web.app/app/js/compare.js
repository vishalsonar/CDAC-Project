let selectOne;
let selectAll = [];
let output = [];
let diff = 10;
let ratio;
let ratioPlus;
let ratioMinus;
let count = 0;
let valueOne;
let valueTwo;
let valueThree;
let margin = 0.02;
let negMargin = -0.02;
let cellCount = 0;
let selectedRow;
let selectedCount = 1;
let selectedNameOne;
let selectedNameTwo;
let selectedNameThree;
let CmpOutput = [];
let tableOne;
let tabelTwo;
let tabelThree;
let preOrder;

onload = function () {
    for (let key in this.localStorage)
        if (key.includes("Resistor_Table_")) {
            let option = this.document.createElement("option");
            option.text = key.substr(15, key.length);
            document.getElementById("table_one").add(option);
        }
    selectedRow = document.getElementById("selectedRow");
    document.getElementById("resistorTolerance").value = margin;
    document.getElementById("negativeResistorTolerance").value = negMargin;
    document.getElementById("ppmTolerance").value = diff;
    disable("cmp");
}

setTolerance = function () {
    let getMargin = document.getElementById("resistorTolerance").value;
    let getDiff = document.getElementById("ppmTolerance").value;
    let getNegMargin = document.getElementById("negativeResistorTolerance").value;
    disable("cmpAll");
    if (getMargin && getDiff && getNegMargin)
        if (getMargin - getNegMargin > 0) {
            margin = Number(getMargin);
            diff = Number(getDiff);
            negMargin = Number(getNegMargin);
            enable("cmp");
            enable("cmpAll");
            showMessage('success', 'Tolerance is Updated');
        } else {
            showMessage('error', 'Please check Tolerance value');
        }
}

disable = function () {
    document.getElementById(arguments[0]).disabled = true;
}

enable = function () {
    document.getElementById(arguments[0]).disabled = false;
}

addSelected = function () {
    selectOne = document.getElementById("table_one").value;
    if (selectOne == "Select Table")
        return false;
    if (selectedCount == 4) {
        showMessage('warning', 'Max Three Tables can be Compared');
        return false;
    }
    if (selectAll.indexOf(selectOne) == -1) {
        selectAll.push(selectOne);
        let x = selectedRow.insertCell(selectedCount);
        x.innerHTML = "R" + selectedCount + " = " + selectOne;
        selectedCount++;
    } else {
        showMessage('warning', 'Table Already Selected');
    }
}

removeLast = function () {
    selectAll.pop();
    if (selectedCount == 1)
        return false;
    selectedCount--;
    selectedRow.deleteCell(selectedCount);
}

compareAll = function () {
    if (selectedCount <= 2) {
        showMessage('warning', 'Select min 2 Tables to Compare');
    }
    if (selectedCount > 2) {
        disable("cmp");
        document.getElementById("dataInput").style.display = "none";
        document.getElementById("showSelected").style.display = "none";
    }
    if (selectedCount == 3) {
        compareTwo();
    }
    if (selectedCount == 4) {
        compareThree();
    }
}

compareTwo = function () {
    tableOne = selectedNameOne = selectAll[0];
    tabelTwo = selectedNameTwo = selectAll[1];
    preOrder = JSON.parse(localStorage.getItem("Resistor_Table_" + tableOne)).tableData;
    preOrder.pop();
    tableOne = JSON.parse(localStorage.getItem("Resistor_Table_" + tableOne)).tableData;
    tabelTwo = JSON.parse(localStorage.getItem("Resistor_Table_" + tabelTwo)).tableData;
    valueOne = tableOne[tableOne.length - 1].actualValue;
    valueTwo = tabelTwo[tabelTwo.length - 1].actualValue;
    tableOne.pop();
    tabelTwo.pop();
    ratio = Number(Number(valueOne / valueTwo).toFixed(6));
    margin = (ratio * margin) / 100;
    negMargin = (ratio * negMargin) / 100;
    ratioPlus = Number((Number(ratio) + margin).toFixed(6));
    ratioMinus = Number((Number(ratio) + negMargin).toFixed(6));
    getTableCompared(tableOne, tabelTwo);
}

getTableCompared = function (one, two) {
    let table = document.getElementById("dataTable");
    deleteTableRow();
    CmpOutput = [];
    createTableHeadForTwo(table);
    let flag = true;
    let flagValue;
    let incrementValue = (ratio * 0.01) / 100;
    let switchMode = true;

    for (let incrementalResistor = ratio; switchMode == true ? incrementalResistor <= ratioPlus : incrementalResistor >= ratioMinus; incrementalResistor += incrementValue) {
        for (let incrementalPPM = 0; incrementalPPM <= diff; incrementalPPM++) {
            for (let i in one) {
                flag = true;
                flagValue = 0;

                for (let j in two) {
                    let diffPpm = one[i].ppm - two[j].ppm;
                    let ratioValue = Number((one[i].value / two[j].value).toFixed(6));

                    if (Math.abs(diffPpm) <= incrementalPPM)
                        if (ratioValue <= incrementalResistor)
                            if (ratioMinus <= ratioValue)
                                if (ratioValue <= ratioPlus) {
                                    if (flag) {
                                        flagValue = ratioValue;
                                        flag = false;
                                    }
                                    if (flagValue >= ratioValue) {
                                        flagValue = ratioValue;
                                        output.push({
                                            j: j,
                                            diff: diffPpm,
                                            ratio: ratioValue,
                                            id_1: one[i].id,
                                            value_1: one[i].value,
                                            ppm_1: one[i].ppm,
                                            id_2: two[j].id,
                                            value_2: two[j].value,
                                            ppm_2: two[j].ppm
                                        });
                                    }
                                }
                }
                if (output.length > 0) {
                    let len = output.length - 1;
                    one.splice(i, 1);
                    two.splice(output[len]["j"], 1);
                    let innerObj = {
                        "id1": output[len]["id_1"],
                        "value1": output[len]["value_1"],
                        "ppm1": output[len]["ppm_1"],
                        "id2": output[len]["id_2"],
                        "value2": output[len]["value_2"],
                        "ppm2": output[len]["ppm_2"],
                        "diff": output[len]["diff"],
                        "ratio": output[len]["ratio"]
                    };
                    CmpOutput.push(innerObj);
                    output = [];
                }
            }
        }
        if (!((incrementalResistor + incrementValue) <= ratioPlus)) {
            incrementalResistor = ratio;
            incrementValue = -incrementValue;
            switchMode = false;
        }
    }
    //CmpOutput.sort(function (a, b) { return a.id1 - b.id1 });
    //arange cmpOutput in order
    let orderedValue = [];
    orderedValue[0] = CmpOutput[0];
    for (let o in preOrder) {
        for (let c in CmpOutput) {
            if (CmpOutput[c].id1)
                if (preOrder[o].id == CmpOutput[c].id1) {
                    orderedValue.push(CmpOutput[c]);
                }
        }
    }
    CmpOutput = orderedValue;
    for (let x in CmpOutput) {
        if (x == 0) {
            continue;
        }
        let row = table.insertRow(count);
        row.insertCell(0).innerHTML = CmpOutput[x].id1;
        row.insertCell(1).innerHTML = CmpOutput[x].value1;
        row.insertCell(2).innerHTML = CmpOutput[x].ppm1;
        row.insertCell(3).innerHTML = CmpOutput[x].id2;
        row.insertCell(4).innerHTML = CmpOutput[x].value2;
        row.insertCell(5).innerHTML = CmpOutput[x].ppm2;
        row.insertCell(6).innerHTML = CmpOutput[x].diff;
        row.insertCell(7).innerHTML = CmpOutput[x].ratio;
        count++;
    }
    one.push({ "actualValue": valueOne });
    two.push({ "actualValue": valueTwo });
    tableOne = one;
    tabelTwo = two;
}

compareThree = function () {
    selectedNameOne = selectAll[0];
    selectedNameTwo = selectAll[1];
    selectedNameThree = selectAll[2];
    preOrder = JSON.parse(localStorage.getItem("Resistor_Table_" + selectAll[0])).tableData;
    preOrder.pop();
    tableOne = JSON.parse(localStorage.getItem("Resistor_Table_" + selectAll[0])).tableData;
    tabelTwo = JSON.parse(localStorage.getItem("Resistor_Table_" + selectAll[1])).tableData;
    tabelThree = JSON.parse(localStorage.getItem("Resistor_Table_" + selectAll[2])).tableData;
    valueOne = tableOne[tableOne.length - 1].actualValue;
    valueTwo = tabelTwo[tabelTwo.length - 1].actualValue;
    valueThree = tabelThree[tabelThree.length - 1].actualValue;
    tableOne.pop();
    tabelTwo.pop();
    tabelThree.pop();
    ratio = Number((Number(valueThree) / (Number(valueOne) + Number(valueTwo))).toFixed(6));
    margin = (ratio * margin) / 100;
    negMargin = (ratio * negMargin) / 100;
    ratioPlus = Number((Number(ratio) + margin).toFixed(6));
    ratioMinus = Number((Number(ratio) + negMargin).toFixed(6));
    getThreeTableCompared(tableOne, tabelTwo, tabelThree);
}

getThreeTableCompared = function (one, two, three) {
    let table = document.getElementById("dataTable");
    deleteTableRow();
    CmpOutput = [];
    createTableHeadForThree(table);
    let kth = null;
    let jth = null;
    let flag = true;
    let flag_one = true;
    let flag_oneValue = 0;
    let absoluteValue = 0;
    let incrementValue = (ratio * 0.01) / 100;
    let switchMode = true;

    for (let incrementalResistor = ratio; switchMode == true ? incrementalResistor <= ratioPlus : incrementalResistor >= ratioMinus; incrementalResistor += incrementValue) {
        for (let incrementalPPM = 0; incrementalPPM <= diff; incrementalPPM++) {
            for (let i in one) {
                flag = true;

                for (let j in two) {
                    //let j = i;
                    flag_one = true;
                    flag_oneValue = 0;

                    for (let k in three) {
                        let vi = ((Number(one[i].value) - Number(two[j].value)) / Number(two[j].value)) * 100;
                        //let so = ((Number(two[j].value) - Number(one[i].value)) / Number(one[i].value)) * 100;
                        if (Math.abs(vi) > 0.02)
                            break;
                        //if (!Math.abs(so) <= 0.02)
                        //break;
                        let ratioValue = Number((Number(three[k].value) / (Number(two[j].value) + Number(one[i].value))).toFixed(6));
                        if (Math.abs(one[i].ppm - two[j].ppm) <= incrementalPPM)
                            if (Math.abs(one[i].ppm - three[k].ppm) <= incrementalPPM)
                                if (Math.abs(two[j].ppm - three[k].ppm) <= incrementalPPM)
                                    if (incrementalResistor >= ratioValue)
                                        if (ratioValue >= ratioMinus) {
                                            if (flag_one) {
                                                flag_oneValue = ratioValue;
                                                flag_one = false;
                                            }
                                            if (flag_oneValue >= ratioValue) {
                                                flag_oneValue = ratioValue;
                                                kth = k;
                                                absoluteValue = ratioValue;
                                            }
                                        }
                    }
                    if (kth) {
                        jth = j;
                        break;
                    }
                    // } else {
                    //     continue;
                    // }
                }
                if (jth && kth) {
                    let innerObj = {
                        "id1": one[i].id,
                        "value1": one[i].value,
                        "ppm1": one[i].ppm,
                        "id2": two[jth].id,
                        "value2": two[jth].value,
                        "ppm2": two[jth].ppm,
                        "id3": three[kth].id,
                        "value3": three[kth].value,
                        "ppm3": three[kth].ppm,
                        "ratio": absoluteValue
                    };
                    CmpOutput.push(innerObj);
                    one.splice(i, 1);
                    two.splice(jth, 1);
                    three.splice(kth, 1);
                }
                kth = null;
                jth = null;
            }
        }
        if (!((incrementalResistor + incrementValue) <= ratioPlus)) {
            incrementalResistor = ratio;
            incrementValue = -incrementValue;
            switchMode = false;
        }
    }
    //CmpOutput.sort(function (a, b) { return a.id1 - b.id1 });
    let orderedValue = [];
    orderedValue[0] = CmpOutput[0];
    for (let o in preOrder) {
        for (let c in CmpOutput) {
            if (CmpOutput[c].id1)
                if (preOrder[o].id == CmpOutput[c].id1) {
                    orderedValue.push(CmpOutput[c]);
                }
        }
    }
    CmpOutput = orderedValue;

    for (let x in CmpOutput) {
        if (x == 0) {
            continue;
        }
        let row = table.insertRow(count);
        row.insertCell(0).innerHTML = CmpOutput[x].id1;
        row.insertCell(1).innerHTML = CmpOutput[x].value1;
        row.insertCell(2).innerHTML = CmpOutput[x].ppm1;
        row.insertCell(3).innerHTML = CmpOutput[x].id2;
        row.insertCell(4).innerHTML = CmpOutput[x].value2;
        row.insertCell(5).innerHTML = CmpOutput[x].ppm2;
        row.insertCell(6).innerHTML = CmpOutput[x].id3;
        row.insertCell(7).innerHTML = CmpOutput[x].value3;
        row.insertCell(8).innerHTML = CmpOutput[x].ppm3;
        row.insertCell(9).innerHTML = CmpOutput[x].ratio;
        count++;
    }
    one.push({ "actualValue": valueOne });
    two.push({ "actualValue": valueTwo });
    three.push({ "actualValue": valueThree });
    tableOne = one;
    tabelTwo = two;
    tabelThree = three;
}

createTableHeadForThree = function (table) {
    let row = table.insertRow(count);
    let counter = 0;
    let headObj = [];
    insert = function () {
        row.insertCell(counter).innerHTML = "<b>" + arguments[0] + "<b/>";
        headObj.push("<b>" + arguments[0] + "<b/>");
        counter++;
    }
    insert("id");
    insert("R1 (" + valueOne + "K&#8486;)<br/>(Table: " + selectedNameOne + ")");
    insert("TCR OF R1 <br/> ppm/&#8451;");
    insert("id");
    insert("R2 (" + valueTwo + "K&#8486;)<br/>(Table: " + selectedNameTwo + ")");
    insert("TCR OF R2 <br/> ppm/&#8451;");
    insert("id");
    insert("R3 (" + valueThree + "K&#8486;)<br/>(Table: " + selectedNameThree + ")");
    insert("TCR OF R3 <br/> ppm/&#8451;");
    insert("Absolute Ratio (R3/R1+R2) = " + ratio + " <br/>(" + (ratioMinus) + " ~ " + (ratioPlus) + ")");
    count++;
    CmpOutput.push(headObj);
}

createTableHeadForTwo = function (table) {
    let row = table.insertRow(count);
    let counter = 0;
    let headObj = [];
    insert = function () {
        row.insertCell(counter).innerHTML = "<b>" + arguments[0] + "<b/>";
        headObj.push("<b>" + arguments[0] + "<b/>");
        counter++;
    }
    insert("id");
    insert("R1 (" + valueOne + "K&#8486;)<br/>(Table: " + selectedNameOne + ")");
    insert("TCR OF R1 <br/>ppm/&#8451;");
    insert("id");
    insert("R2 (" + valueTwo + "K&#8486;)<br/>(Table: " + selectedNameTwo + ")");
    insert("TCR OF R2 <br/>ppm/&#8451;");
    insert("Difference (R1-R2) <br/> ppm/&#8451;");
    insert("Absolute Ratio (R1/R2) = " + ratio + "<br/>(" + (ratioMinus) + " ~ " + (ratioPlus) + ")");
    count++;
    CmpOutput.push(headObj);
}

deleteTableRow = function () {
    let tableRow = document.getElementById("dataTable").rows.length;
    for (let i = tableRow - 1; i >= 0; i--)
        document.getElementById("dataTable").deleteRow(i);
    count = 0;
}

saveTable = function () {
    let name = document.getElementById("tableName").value;
    if (name) {
        if (CmpOutput.length != 0) {
            //if (confirm("Are you sure you want to save this Table?")) {
            localStorage.setItem("Resistor_Table_" + selectedNameOne, JSON.stringify({ "tableData": tableOne }));
            localStorage.setItem("Resistor_Table_" + selectedNameTwo, JSON.stringify({ "tableData": tabelTwo }));
            if (selectedCount == 4) {
                localStorage.setItem("Resistor_Table_" + selectedNameThree, JSON.stringify({ "tableData": tabelThree }));
            }
            localStorage.setItem("_Table_" + name, JSON.stringify(CmpOutput));
            showMessage('success', 'Table is Saved');
        } else {
            showMessage('error', 'Unable to Save Table, No Data Found');
        }
    } else {
        //alert("Please Enter Table Name");
        showMessage('warning', 'Please Enter Table Name');
    }
}

function showMessage(type_, message) {
    $().toastmessage('showToast', {
        text: message,
        sticky: false,
        position: 'top-right',
        stayTime: 3000,
        type: type_,
        close: function () { }
    });
}