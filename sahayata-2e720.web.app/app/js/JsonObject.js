class JsonObject {
    constructor() {
        this.root = {
            tableData: []
        }
    }

    insert(id, value, ppm) {
        this.root.tableData.push(
            {
                id: id,
                value: value,
                ppm: ppm
            }
        );
    }

    update(oldData, data) {
        let id = oldData["id"];
        let value = oldData["value"];
        let ppm = oldData["ppm"];
        let allData = this.root.tableData;
        for (let x in allData) {
            if (allData[x]["id"] == id)
                if (allData[x]["value"] == value)
                    if (allData[x]["ppm"] == ppm) {
                        allData[x] = data;
                        console.log(x);
                    }
        }
    }

    actualValue(actual) {
        this.root.tableData.push(
            {
                actualValue: actual
            }
        );
    }

    remove() {
        this.root.tableData.pop();
    }

    getString() {
        return JSON.stringify(this.root);
    }
}


