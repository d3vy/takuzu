class Takuzu {
    constructor(size) {
        this.grid = Grid.init(size);
        this.size = size;

        this.grid.generate();
        this.clearCells();
    }

    clearCells(attempts = 5) {
        let i;

        while(attempts > 0) {
            while(this.grid.cells[i = Math.floor(random(this.size ** 2))].value === null);
            let value = this.grid.cells[i].value;
            this.grid.cells[i].value  = null;
            this.grid.cells[i].stored = false;

            let testGrid = this.grid.clone();
            testGrid.solutions = 0;
            testGrid.solve();

            console.log(testGrid.solutions);

            if(testGrid.solutions !== 1) {
                this.grid.cells[i].value  = value;
                this.grid.cells[i].stored = true;
                attempts--;
            }
        }
    }
}
