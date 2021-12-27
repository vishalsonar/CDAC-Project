// HashTable for each array

var HashOne = new HashTable(40);
RowArrayOne = function () {
    if (coinColour != "white")
        if (One == null) {
            One = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            One.forEach(element => {
                HashOne.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            One.forEach(element => {
                HashOne.remove(element);
            });
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            One = null;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var HashTwo = new HashTable(40);
RowArrayTwo = function () {
    if (coinColour != "white")
        if (Two == null) {
            Two = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Two.forEach(element => {

                HashTwo.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Two.forEach(element => {
                HashTwo.remove(element);
            });
            Two = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var HashThree = new HashTable(40);
RowArrayThree = function () {
    if (coinColour != "white")
        if (Three == null) {
            Three = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
            Three.forEach(element => {
                HashThree.put(element, coinValue, coinColour);
            });
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Three.forEach(element => {
                HashThree.remove(element);
            });
            Three = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var HashFour = new HashTable(40);
RowArrayFour = function () {
    if (coinColour != "white")
        if (Four == null) {
            Four = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Four.forEach(element => {
                HashFour.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Four.forEach(element => {
                HashFour.remove(element);
            });
            Four = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var HashFive = new HashTable(40);
RowArrayFive = function () {
    if (coinColour != "white")
        if (Five == null) {
            Five = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Five.forEach(element => {
                HashFive.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Five.forEach(element => {
                HashFive.remove(element);
            });
            Five = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var HashSix = new HashTable(40);
RowArraySix = function () {
    if (coinColour != "white")
        if (Six == null) {
            Six = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Six.forEach(element => {
                HashSix.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Six.forEach(element => {
                HashSix.remove(element);
            });
            Six = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}