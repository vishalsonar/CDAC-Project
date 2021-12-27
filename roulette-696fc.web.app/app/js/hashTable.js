class Hentry {
    constructor(key, value, colour) {
        this.key = key;
        this.value = value;
        this.colour = colour;
    }
}

class HashTable {
    constructor(size) {
        this.size = size;
        this.table = [];
        for (var i = 0; i < this.size; i++)
            this.table[i] = new Hentry(i, null, null);
    }

    put(key, value, colour) {
        if (key == '00')
            this.table[38] = new Hentry(key, value, colour);
        else if (this.table[key].value == null)
            this.table[key] = new Hentry(key, value, colour);
        else
            console.log("error");

        if (key == '00')
            console.log(this.table[38]);
        else
            console.log(this.table[key]);
    }

    get(key) {
        if (key == '00')
            return this.table[38].value;
        else
            return this.table[key].value;
    }

    remove(key) {
        if (key == '00')
            this.table[38] = null;
        else
            this.table[key].value = null;
    }
}
