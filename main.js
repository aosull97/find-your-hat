const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.indexX = 0;
    this.indexY = 0;
    this.field[0][0] = pathCharacter;
  } 

   print() {
    for(let i=0; i < this.field.length; i++){
    let printedField = this.field[i].join(' ')
    console.log(printedField);
    }
  }

  playGame() {
    const answer = prompt('Which direction would you like to move?');
      switch(answer) {
        case 'l':
          this.indexX -= 1;
          break;
        case 'r':
          this.indexX += 1;
          break;
        case 'u':
          this.indexY -= 1;
          break;
        case 'd':
          this.indexY += 1;
          break;
        default:
          console.log('Enter u, d, l or r')
          this.playGame();
          break;
      }
    
    this.boundaries();
    this.checkForHoleOrHat();
    
  }

  boundaries(){
    if(this.indexX < 0){
      console.log('Out of bounds! Cannot make that move!')
      this.indexX = 0;
      this.playGame();
    } else if(this.indexY < 0){
       console.log('Out of bounds! Cannot make that move!')
       this.indexY = 0;
       this.playGame();
    }
  }

changePosition(){
  for(let i=0; i < this.field.length; i++){
  this.field[this.indexY][this.indexX] = '*'
  console.log(this.field[i].join(' '));
    }
  }

checkForHoleOrHat(){
  if(this.field[this.indexY][this.indexX] === hole){
    console.log('Oh no, you fell in a hole! Game over.')
    this.indexX = 0;
    this.indexY = 0;
  } else if(this.field[this.indexY][this.indexX] === hat){
    console.log('You found your hat! You win!')
  }
  else {
    this.changePosition();
    this.playGame();
  }
}

  static generateField(height, width, percentage = 0.1){  
    let array = [];
      
      // Loop to initialize 2D array elements.
      for (let i = 0; i < height; i++) {
          array[i] = [];
          for (let j = 0; j < width; j++) {
              const prob = Math.random();
              array[i][j] = prob > percentage ? fieldCharacter : hole;
              array[0][0] = pathCharacter;
          }
      }
      
     // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // Make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    array[hatLocation.y][hatLocation.x] = hat;
    return array;
  }
}


const myField = new Field(Field.generateField(3, 3, 0.2));


myField.print();
myField.playGame();




