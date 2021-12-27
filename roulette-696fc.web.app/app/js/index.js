let loginFlag = true;
let regFlag = false;

onload = function () {
    sessionStorage.clear();
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

switchl = function () {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
    document.getElementById("Rname").value = "";
    document.getElementById("Rpass").value = "";
    document.getElementById("Epass").value = "";
    regFlag = true;
    loginFlag = false;
}

cancel = function () {
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("UserName").value = "";
    document.getElementById("Password").value = "";
    regFlag = false;
    loginFlag = true;
}

login = function () {
    var user = document.getElementById("UserName").value;
    var pass = document.getElementById("Password").value;
    if (user != "" && pass != "") {
        var userBlock = {};
        try {
            userBlock = JSON.parse(localStorage[user]);
            var usern = userBlock[user].UserName;
            var passn = userBlock[user].Password;
        } catch (e) {
            //alert("Invalid UserName Or Password");
        }
        if (user == usern && pass == passn) {
            //alert("Loged In " + usern);
            sessionStorage.setItem("username", usern);
            sessionStorage.setItem("password", passn);
            sessionStorage.setItem("coin", userBlock[user].coin);
            window.location.href = "casino.html";
        } else {
            //alert("Invalid UserName Or Password");
            showMessage('error', 'Invalid UserName Or Password');
        }
        //document.getElementById("error").style.display = "block";
    }
    else
        //alert("Some Field is Empty");
        showMessage('warning', 'Some Field are Empty');
}

signIn = function () {
    //localStorage.clear();
    var user = document.getElementById("Rname").value;
    var pass = document.getElementById("Rpass").value;
    var eass = document.getElementById("Epass").value;
    if (user == "" || pass == "" || eass == "") {
        //alert("Some Field is empty");
        showMessage('warning', 'Some Field are Empty');
        return false;
    }
    if (pass == eass && pass != "" && eass != "") {
        if(localStorage.getItem(user)){
            showMessage('error', 'User already Registered');
            return false;
        }
        var userBlock = {};
        userBlock[user] = { UserName: user, Password: pass, coin: 10000 };
        try {
            localStorage[user] = JSON.stringify(userBlock);
        } catch (e) {
            //alert("Error while Storing Data");
            showMessage('error', 'Error while Storing Data');
        }
        //alert("Registerd Successfully");
        $().toastmessage('showToast', {
            text: 'Registerd Successfully',
            sticky: false,
            position: 'top-right',
            stayTime: 3000,
            type: 'success',
            close: function () {location.reload(); }
        });
    }
    else
        //alert("Password did not matched");
        showMessage('error', 'Password did not matched');
}

document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if (regFlag == true) {
            signIn();
            return true;
        }
        if (loginFlag = true) {
            login();
        }
    }
});