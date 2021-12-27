
var list = new LinkList();
var Htable = new HashTable(51);

list.addNode(0, '#1B5E20');
list.addNode('00', '#1B5E20');

var coinValue = 0;
var coinColour = "white";
var sumCoin = 0;
var subCoin = 0;

var UserName = null;
var totalCoin = 0;

var One = null;
var Two = null;
var Three = null;
var Four = null;
var Five = null;
var Six = null;

var numberColor = [2, 4, 6, 8, 10, 11, 15, 17, 20, 24, 22, 26, 28, 31, 33, 35];
BLACK = function (val) {
    for (var i = 0; i < numberColor.length; i++)
        if (val == numberColor[i])
            return true;

}


for (var i = 1; i < 37; i++)
    if (BLACK(i))
        list.addNode(i, "#212121");
    else
        list.addNode(i);

LOAD = function () {
    list.insertValue();
    list.insertCheapTable();

    document.getElementById("infoTable").rows[0].cells[0].innerHTML = "UserName : " + sessionStorage.getItem("username");
    document.getElementById("infoTable").rows[0].cells[1].innerHTML
        = "Total Coins : &#x20B9;" + sessionStorage.getItem("coin");
}


var called = function () {
    list.roll();
}

function showMessage(level, text) {
    $().toastmessage('showToast', {
        text: text,
        sticky: false,
        position: 'top-right',
        stayTime: 3000,
        type: level,
        close: function () { }
    });
}

ROLL = function () {
    let coinBeted = document.getElementById("infoTable").rows[0].cells[2].innerHTML;
    if (coinBeted.length == 15)
        if (coinBeted.substring(14, 15) == 0) {
            showMessage("warning", "Please Bet Some coins");
            return false;
        }
    if (!document.getElementById("infoTable").rows[0].cells[2].innerHTML) {
        showMessage("warning", "Please Bet Some coins");
        return false;
    }

    let improperValue = document.getElementById("infoTable").rows[0].cells[2].innerHTML.split(":")[1];
    let currentCoinValueVal = improperValue.substring(2, improperValue.length);
    if (currentCoinValueVal == 0) {
        return false;
    }
    var buttonDisabled = document.getElementsByTagName("button");

    for (var i = 0; i < buttonDisabled.length; i++)
        buttonDisabled[i].disabled = true;

    document.getElementById("blocker").style.display = "block";

    coinColour = undefined;
    coinValue = undefined;

    for (var i = 0; i < Math.random() * 1000000; i++)
        setTimeout(called, 10);

    setTimeout(() => {

        var i = 0;
        var temp = null;

        for (temp = list.head.next; i < Math.random() * 50; i++ , temp = temp.next) { }

        var Ctemp = temp.colour;
        temp.colour = "blue";
        list.insertValue();

        if (Htable.get(temp.value) != undefined || Htable.get(temp.value) != null)
            sumCoin += 3 * Htable.get(temp.value);

        if (HashOne.get(temp.value) != undefined || HashOne.get(temp.value) != null)
            sumCoin += 2 * HashOne.get(temp.value);

        if (HashTwo.get(temp.value) != undefined || HashTwo.get(temp.value) != null)
            sumCoin += 2 * HashTwo.get(temp.value);

        if (HashThree.get(temp.value) != undefined || HashThree.get(temp.value) != null)
            sumCoin += 2 * HashThree.get(temp.value);

        if (HashFour.get(temp.value) != undefined || HashFour.get(temp.value) != null)
            sumCoin += 2 * HashFour.get(temp.value);

        if (HashFive.get(temp.value) != undefined || HashFive.get(temp.value) != null)
            sumCoin += 2 * HashFive.get(temp.value);

        if (HashSix.get(temp.value) != undefined || HashSix.get(temp.value) != null)
            sumCoin += 2 * HashSix.get(temp.value);





        if (GHone.get(temp.value) != undefined || GHone.get(temp.value) != null)
            sumCoin += GHone.get(temp.value);

        if (GHtwo.get(temp.value) != undefined || GHtwo.get(temp.value) != null)
            sumCoin += GHtwo.get(temp.value);

        if (GHthree.get(temp.value) != undefined || GHthree.get(temp.value) != null)
            sumCoin += GHthree.get(temp.value);

        if (GHfour.get(temp.value) != undefined || GHfour.get(temp.value) != null)
            sumCoin += GHfour.get(temp.value);

        if (GHfive.get(temp.value) != undefined || GHfive.get(temp.value) != null)
            sumCoin += GHfive.get(temp.value);

        if (GHsix.get(temp.value) != undefined || GHsix.get(temp.value) != null)
            sumCoin += GHsix.get(temp.value);



        sessionStorage.setItem("coin", Number(sessionStorage.getItem("coin")) + (sumCoin - subCoin));

        userBlock = JSON.parse(localStorage[sessionStorage.getItem("username")]);
        userBlock[sessionStorage.getItem("username")] =
            {
                UserName: sessionStorage.getItem("username"),
                Password: sessionStorage.getItem("password"),
                coin: sessionStorage.getItem("coin")
            }

        try {
            localStorage[sessionStorage.getItem("username")] = JSON.stringify(userBlock);
        } catch (e) {
            //alert("Error in Storing Data");
            showMessage('error', 'Error in Storing Data');
        }



        temp.colour = Ctemp;

    }, 500);

    setTimeout(() => {
        //alert();
        let mess = "Total Coin Won : " + sumCoin + "  <br/>Total Coin Invested : " + subCoin;
        $().toastmessage('showToast', {
            text: mess,
            sticky: false,
            position: 'top-right',
            stayTime: 3000,
            type: 'notice',
            close: function () { location.reload(); }
        });
    }, 9000);
}


tadd = function (i, j) {

    if (document.getElementById("CheapTable").rows[i].cells[j].style.color == "white"
        || document.getElementById("CheapTable").rows[i].cells[j].style.color == "") {
        document.getElementById("CheapTable").rows[i].cells[j].style.color = coinColour;
        Htable.put(
            document.getElementById("CheapTable").rows[i].cells[j].innerHTML,
            coinValue, coinColour
        );
        subCoin += coinValue;
        document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
    }
    else {
        document.getElementById("CheapTable").rows[i].cells[j].style.color = "white";
        Htable.remove(document.getElementById("CheapTable").rows[i].cells[j].innerHTML);
        subCoin -= coinValue;
        document.getElementById("infoTable").rows[0].cells[2].innerHTML = "Coins Used : &#x20B9;" + subCoin;
    }

}

COIN = function () {
    coinValue = arguments[0];
    coinColour = arguments[1];
}


