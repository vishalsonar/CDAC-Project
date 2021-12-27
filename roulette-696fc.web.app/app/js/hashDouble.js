
var Gone = null;
var Gtwo = null;
var Gthree = null;
var Gfour = null;
var Gfive = null;
var Gsix = null;

var GHone = new HashTable(40);

GroupArrayOne = function () {
    if (coinColour != "white")
        if (Gone == null) {
            Gone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gone.forEach(element => {
                GHone.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        } else {
            Gone.forEach(element => {
                GHone.remove(element);
            });
            Gone = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var GHtwo = new HashTable(40);
GroupArrayTwo = function () {
    if (coinColour != "white")
        if (Gtwo == null) {
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gtwo = [];
            var j = 0;
            for (var i = 0; i <= 36; i++)
                if (i % 2 == 0) {
                    Gtwo[j] = i;
                    j++;
                }
            Gtwo.forEach(element => {
                GHtwo.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        } else {
            Gtwo.forEach(element => {
                GHtwo.remove(element);
            });
            Gtwo = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var GHthree = new HashTable(40);
GroupArrayThree = function () {
    if (coinColour != "white")
        if (Gthree == null) {
            Gthree = [1, 3, 5, 7, 9, 12, 13, 14, 16, 18, 19, 21, 23, 25, 27, 29, 30, 32, 34, 36];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gthree.forEach(element => {
                GHthree.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].innerHTML = "RED";
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Gthree.forEach(element => {
                GHthree.remove(element);
            });
            Gthree = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].innerHTML = "RED";
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "white";
        }
}

var GHfour = new HashTable(40);
GroupArrayFour = function () {
    if (coinColour != "white")
        if (Gfour == null) {
            Gfour = [2, 4, 6, 8, 10, 11, 15, 17, 20, 24, 22, 26, 28, 31, 33, 35];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gfour.forEach(element => {
                GHfour.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].innerHTML = "BLACK";
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        }
        else {
            Gfour.forEach(element => {
                GHfour.remove(element);
            });
            Gfour = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].innerHTML = "BLACK";
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "white";
        }
}

var GHfive = new HashTable(40);
GroupArrayFive = function () {
    if (coinColour != "white")
        if (Gfive == null) {
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gfive = [];
            var j = 0;
            for (var i = 0; i <= 36; i++)
                if (i % 2 != 0) {
                    Gfive[j] = i;
                    j++;
                }
            Gfive.forEach(element => {
                GHfive.put(element, coinValue, coinColour);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        } else {
            Gfive.forEach(element => {
                GHfive.remove(element);
            });
            Gfive = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}

var GHsix = new HashTable(40);
GroupArraySix = function () {
    if (coinColour != "white")
        if (Gsix == null) {
            Gsix = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            subCoin += coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            Gsix.forEach(element => {
                GHsix.put(element);
            });
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = coinColour;
        } else {
            Gsix.forEach(element => {
                GHsix.remove(element);
            });
            Gsix = null;
            subCoin -= coinValue;
            document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
            document.getElementById("CheapTable").rows[arguments[0]].cells[arguments[1]].style.color = "black";
        }
}
