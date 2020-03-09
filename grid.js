class Grid {
    constructor(size) {
        this.cells = [];
        this.size  = size;
        this.solutions;
    }

    getCell(row, col) {
        return this.cells[row * this.size + col];
    }

    setCell(row, col, value) {
        this.cells[row * this.size + col] = new Cell(value);
        return this;
    }

    generate() {
        for(let i = 0; i < this.size ** 2; i++) {
            if(this.cells[i].value === null) {
                let values = shuffle([0, 1]);
                for(let value of values) {
                    if(this.possible(Math.floor(i / this.size), i % this.size, value)) {
                        this.cells[i].value = value;
                        if(this.generate()) {
                            return true;
                        }
                        this.cells[i].value = null;
                    }
                }

                return false;
            }
        }

        return true;
    }

    solve() {
        for(let i = 0; i < this.size ** 2; i++) {
            if(this.cells[i].value === null) {
                for(let value = 0; value <= 1; value++) {
                    if(this.possible(Math.floor(i / this.size), i % this.size, value)) {
                        this.cells[i].value = value;
                        if(this.countEmptyCells() === 0) {
                            this.solutions++;
                            break;
                        } else if(this.solve()) {
                            return true;
                        }
                        this.cells[i].value = null;
                    }
                }

                return false;
            }
        }

        return true;
    }

    possible(row, col, value) {
        let countCol   = 0;
        let countRow   = 0;
        let colStrings = [];
        let rowStrings = [];

        for(let i = 0; i < this.size; i++) {
            if(this.getCell(row, i).value === value) {
                countCol++;
            }

            if(this.getCell(i, col).value === value) {
                countRow++;
            }

            if(countCol >= this.size / 2 || countRow >= this.size / 2) {
                return false;
            }

            let rowString = '';
            let colString = '';
            for(let j = 0; j < this.size; j++) {
                rowString += this.getCell(i, j).value !== null ? this.getCell(i, j).value : '';
                colString += this.getCell(j, i).value !== null ? this.getCell(j, i).value : '';
            }

            if((rowString.length === this.size && rowStrings.indexOf(rowString) > -1)
                || (colString.length === this.size && colStrings.indexOf(colString) > -1)
            ) {
                return false;
            }

            rowStrings.push(rowString);
            colStrings.push(colString);
        }

        if(col - 2 >= 0
            && this.getCell(row, col - 2).value === value === this.getCell(row, col - 1).value
        ) {
            return false;
        }

        if(col - 1 >= 0 && col + 1 < this.size
            && this.getCell(row, col - 1).value === value === this.getCell(row, col + 1).value
        ) {
            return false;
        }

        if(col + 2 < this.size
            && this.getCell(row, col + 1).value === value === this.getCell(row, col + 2).value
        ) {
            return false;
        }

        if(row - 2 >= 0
            && this.getCell(row - 2, col).value === value === this.getCell(row - 1, col).value
        ) {
            return false;
        }

        if(row - 1 >= 0 && row + 1 < this.size
            && this.getCell(row - 1, col).value === value === this.getCell(row + 1, col).value
        ) {
            return false;
        }

        if(row + 2 < this.size
            && this.getCell(row + 1, col).value === value === this.getCell(row + 2, col).value
        ) {
            return false;
        }

        return true;
    }

    countEmptyCells() {
        let num = 0;
        for(let i = 0; i < this.size ** 2; i++) {
            if(this.cells[i].value === null) {
                num++;
            }
        }

        return num;
    }

    clone() {
        let clone = new Grid();
        for(let i = 0; i < this.size ** 2; i++) {
            clone.cells[i] = new Cell(this.cells[i].value, this.cells[i].stored);
        }

        return clone;
    }

    static init(size) {
        let grid = new Grid(size);

        for(let i = 0; i < size ** 2; i++) {
            grid.cells[i] = new Cell(null);
        }

        return grid;
    }
}
