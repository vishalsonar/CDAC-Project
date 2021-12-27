class DataTable {
    constructor(tableName) {
        this.count = 0;
        this.table = document.getElementById(tableName);
    }

    insert(id, value, PPM) {
        this.incrementCount();
        let row = this.table.insertRow(this.count);
        let idCell = row.insertCell(0);
        let valueCell = row.insertCell(1);
        let ppmCell = row.insertCell(2);
        let iId = row.insertCell(3);
        let update = row.insertCell(4);
        iId.innerHTML = this.getCount();
        iId.style.backgroundColor = "black";
        update.innerHTML = "<a class='updateRow' id='" + this.getCount() + "' onclick='updateRowById(this.id)'>update row</a>";
        idCell.innerHTML = id;
        valueCell.innerHTML = value;
        ppmCell.innerHTML = PPM;
        return true;
    }

    getRowDataById(id) {
        let crray = this.table.rows[id].cells;
        return {
            "id": crray[0].innerHTML,
            "value": crray[1].innerHTML,
            "ppm": crray[2].innerHTML,
            "iId": crray[3].innerHTML
        };
    }

    updateRow(id, data) {
        let crray = this.table.rows[id].cells;
        let ids = ["id", "value", "ppm"];
        for (let x = 0; x < 3; x++) {
            crray[x].innerHTML = data[ids[x]];
        }
        return true;
    }

    remove() {
        if (this.count > 0) {
            this.table.deleteRow(this.count);
            this.decrementCount();
        }
    }

    incrementCount() {
        this.count++;
    }

    decrementCount() {
        this.count--;
    }

    getCount() {
        return this.count;
    }
}