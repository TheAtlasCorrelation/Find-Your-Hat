const prompt = require("prompt-sync")({ sigint: true });

// Initialise field characters:
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }

  isInField() {
    return (
      this.locationX >= 0 &&
      this.locationY >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  game() {
    let gameRun = true;
    while (gameRun) {
      this.print();
      this.movePlayer();
      if (!this.isInField()) {
        console.log("You went out of the field!");
        gameRun = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hat) {
        console.log("Well done! You found your hat!");
        gameRun = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hole) {
        console.log("Nooooooo, you fell down a hole!");
        gameRun = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  movePlayer() {
    let move = prompt("Which way do you wan't to move?");
    switch (move) {
      case "l":
        this.locationX -= 1;
        break;
      case "r":
        this.locationX += 1;
        break;
      case "u":
        this.locationY -= 1;
        break;
      case "d":
        this.locationY += 1;
        break;
      default:
        console.log("Enter (l)eft, (r)ight, (u)p or (d)own to move.");
        this.movePlayer();
        break;
    }
  }

  print() {
    console.log("Enter (l)eft, (r)ight, (u)p or (d)own to move");
    this.field.forEach((elem) => console.log(elem.join("")));
  }
}
let difficulty = prompt("Enter easy, medium or hard: ");
let field = [];
let height = 0;
let width = 0;
let holePercentage = 0;

switch (difficulty) {
  case "easy":
    height = 7;
    width = 20;
    holePercentage = 0.2;
    break;
  case "medium":
    height = 17;
    width = 62;
    holePercentage = 0.3;
    break;
  case "hard":
    height = 27;
    width = 54;
    holePercentage = 0.3;
    break;
  default:
    height = 10;
    width = 45;
    holePercentage = 0.3;
    break;
}



for (let i = 0; i < height; i++) {
  field.push([]);
  for (let j = 0; j < width; j++) {
    if (Math.random() < holePercentage) {
      field[i].push(hole);
    } else {
      field[i].push(fieldCharacter);
    }
  }
}

let hatX = Math.floor(Math.random() * width);
let hatY = Math.floor(Math.random() * height);

while (hatX === 0 && hatY === 0) {
  hatX = Math.floor(Math.random() * width);
  hatY = Math.floor(Math.random() * height);
}

field[hatY][hatX] = hat;

const myField = new Field(field);


myField.game();
