let size = 4;
let takuzu;

function setup() {
    createCanvas(400, 400);
    frameRate(10);

    takuzu = new Takuzu(size);
}

function draw() {
    clear();

    for(let i = 0; i < size ** 2; i++) {
        let row = Math.floor(i / size);
        let col = i % size;

        let cell = takuzu.grid.getCell(row, col);

        if(cell.value === null) {
            noFill();
        } else if(cell.value) {
            fill(0, 116, 217);
        } else {
            fill(133, 20, 75);
        }
        square(col * (width / size), row * (height / size), width / size);
    }

    stroke(255);
    noFill();
    square(0, 0, width);
    for(let i = 1; i < size; i++) {
        line(width / (size / i), 0, width / (size / i), height);
        line(0, height / (size / i), width, height / (size / i));
    }
}
