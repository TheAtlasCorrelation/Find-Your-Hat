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
    clear();
    console.log("Enter (l)eft, (r)ight, (u)p or (d)own to move");
    this.field.forEach((elem) => console.log(elem.join("")));
  }

  static generateField(height, width, percentage) {
    let field = [];
    for (let fieldTileY = 0; fieldTileY < height; fieldTileY++) {
      field[fieldTileY] = [];
      for (let fieldTileX = 0; fieldTileX < width; fieldTileX++) {
        field[fieldTileY][fieldTileX] = fieldCharacter;
      }
    }

    field[Math.floor(Math.random() * field.length)][
      Math.floor(Math.random() * field[0].length)
    ] = hat;
    field[0][0] = pathCharacter;

    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === hat) {
          var hatX = x;
          var hatY = y;
          break;
        }
      }
    }

    let totalNumHoles = Math.floor(height * width * (percentage / 100));

    while (totalNumHoles > 0) {
      let randIndex = Math.floor(Math.random() * field.length);
      let randIndex2 = Math.floor(Math.random() * field[0].length);

      if (
        (randIndex === 0 && randIndex2 === 0) ||
        (randIndex === 1 && randIndex2 === 1) ||
        (randIndex === 0 && randIndex2 === 1) ||
        (randIndex === 1 && randIndex2 === 0) ||
        field[randIndex][randIndex2] === hat ||
        field[randIndex][randIndex2] === field[hatY][hatX]
      ) {
        continue;
      }
      field[randIndex][randIndex2] = hole;
      totalNumHoles--;
    }
    return field;
  }
}

let fieldHeight = 0;
let fieldWidth = 0;
let holePercentage = 0;

fieldHeight = Number(prompt("Enter Field height( - 30):"));
fieldWidth = Number(prompt("Enter Field width(2 - 145): "));

holePercentage = Number(prompt("Enter your percentage here: "));
const myField = new Field(
  Field.generateField(fieldHeight, fieldWidth, holePercentage)
);

myField.game();
