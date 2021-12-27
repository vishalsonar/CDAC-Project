class Node {
    constructor(val, col = "#F44336") {
        this.value = val;
        this.next = null;
        this.prev = null;
        this.colour = col;
        this.token = 0;
    }
}

class LinkList {
    constructor() {
        this.head = new Node(0);
        this.tail = new Node(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addNode(val, col) {
        let node = new Node(val, col);
        node.next = this.tail;
        node.prev = this.tail.prev;
        this.tail.prev.next = node;
        this.tail.prev = node;
    }

    insertValue() {
        var i = 0, j = 0;
        for (var temp = this.head.next; temp != this.tail; temp = temp.next) {
            if (i == 0) {
                document.getElementById("Spinner").rows[i].cells[j].innerHTML = temp.value;
                document.getElementById("Spinner").rows[i].cells[j].style.backgroundColor = temp.colour;
                document.getElementById("Spinner").rows[i].cells[j].style.border = "2px solid black";
                if (j == 17) {
                    i++;
                    continue;
                }
                j++;
            }

            if (i == 1) {
                document.getElementById("Spinner").rows[i].cells[j].innerHTML = temp.value;
                document.getElementById("Spinner").rows[i].cells[j].style.backgroundColor = temp.colour;
                document.getElementById("Spinner").rows[i].cells[j].style.border = "2px solid black";
                i++;
                continue;
            }

            if (i == 2) {
                document.getElementById("Spinner").rows[i].cells[j].innerHTML = temp.value;
                document.getElementById("Spinner").rows[i].cells[j].style.backgroundColor = temp.colour;
                document.getElementById("Spinner").rows[i].cells[j].style.border = "2px solid black";
                if (j == 0) {
                    i--;
                    continue;
                }
                j--;
            }
        }
    }

    insertCheapTable() {
        document.getElementById("CheapTable").rows[0].cells[0].innerHTML = this.head.next.value;
        document.getElementById("CheapTable").rows[0].cells[0].style.backgroundColor = this.head.next.colour;
        document.getElementById("CheapTable").rows[0].cells[0].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[2].cells[0].innerHTML = this.head.next.next.value;
        document.getElementById("CheapTable").rows[2].cells[0].style.backgroundColor = this.head.next.next.colour;
        document.getElementById("CheapTable").rows[2].cells[0].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[0].cells[13].innerHTML = "2 to 1";
        document.getElementById("CheapTable").rows[0].cells[13].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[0].cells[13].style.color = "black";
        document.getElementById("CheapTable").rows[1].cells[12].innerHTML = "2 to 1";
        document.getElementById("CheapTable").rows[1].cells[12].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[1].cells[12].style.color = "black";
        document.getElementById("CheapTable").rows[2].cells[13].innerHTML = "2 to 1";
        document.getElementById("CheapTable").rows[2].cells[13].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[2].cells[13].style.color = "black";
        document.getElementById("CheapTable").rows[3].cells[0].innerHTML = "1<sup>st</sup> 12";
        document.getElementById("CheapTable").rows[3].cells[0].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[3].cells[0].style.color = "black";
        document.getElementById("CheapTable").rows[3].cells[1].innerHTML = "2<sup>nd</sup> 12";
        document.getElementById("CheapTable").rows[3].cells[1].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[3].cells[1].style.color = "black";
        document.getElementById("CheapTable").rows[3].cells[2].innerHTML = "3<sup>rd</sup> 12";
        document.getElementById("CheapTable").rows[3].cells[2].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[3].cells[2].style.color = "black";
        document.getElementById("CheapTable").rows[4].cells[1].innerHTML = "1 to 18";
        document.getElementById("CheapTable").rows[4].cells[1].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[1].style.color = "black";
        document.getElementById("CheapTable").rows[4].cells[2].innerHTML = "EVEN";
        document.getElementById("CheapTable").rows[4].cells[2].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[2].style.color = "black";
        document.getElementById("CheapTable").rows[4].cells[3].innerHTML = "RED";
        document.getElementById("CheapTable").rows[4].cells[3].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[3].style.backgroundColor = "#F44336";
        document.getElementById("CheapTable").rows[4].cells[4].innerHTML = "BLACK";
        document.getElementById("CheapTable").rows[4].cells[4].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[4].style.backgroundColor = "#212121";
        document.getElementById("CheapTable").rows[4].cells[5].innerHTML = "ODD";
        document.getElementById("CheapTable").rows[4].cells[5].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[5].style.color = "black";
        document.getElementById("CheapTable").rows[4].cells[6].innerHTML = "19 to 36";
        document.getElementById("CheapTable").rows[4].cells[6].style.border = "2px solid black";
        document.getElementById("CheapTable").rows[4].cells[6].style.color = "black";

        var i = 0, j = 1;
        for (var temp = this.head.next.next.next; temp != this.tail; temp = temp.next.next.next) {
            document.getElementById("CheapTable").rows[i].cells[j].innerHTML = temp.value;
            document.getElementById("CheapTable").rows[i].cells[j].style.backgroundColor = temp.colour;
            document.getElementById("CheapTable").rows[i].cells[j].style.border = "2px solid black";
            j++;
            if (j == 13) {
                break;
            }
        }
        i = 1; j = 0;
        for (var temp = this.head.next.next.next.next; temp != this.tail; temp = temp.next.next.next) {
            document.getElementById("CheapTable").rows[i].cells[j].innerHTML = temp.value;
            document.getElementById("CheapTable").rows[i].cells[j].style.backgroundColor = temp.colour;
            document.getElementById("CheapTable").rows[i].cells[j].style.border = "2px solid black";
            j++;
            if (j == 12) {
                break;
            }
        }
        i = 2; j = 1;
        for (var temp = this.head.next.next.next.next.next; temp != this.tail; temp = temp.next.next.next) {
            document.getElementById("CheapTable").rows[i].cells[j].innerHTML = temp.value;
            document.getElementById("CheapTable").rows[i].cells[j].style.backgroundColor = temp.colour;
            document.getElementById("CheapTable").rows[i].cells[j].style.border = "2px solid black";
            j++;
            if (j == 13) {
                break;
            }
        }
    }

    roll() {
        var hold = this.tail.prev.value;
        var holdc = this.tail.prev.colour;
        for (var temp = this.tail.prev.prev; temp != this.head; temp = temp.prev) {
            temp.next.value = temp.value;
            temp.next.colour = temp.colour;
        }
        this.head.next.value = hold;
        this.head.next.colour = holdc;
        this.insertValue();
    }
}