var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame(){
  this.stacks = [
    [1, 2, 3],
    [],
    []
  ];
}

HanoiGame.prototype.isWon = function() {
  return (this.stacks[1].length === 3 || this.stacks[2].length === 3);
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  if (this.stacks[startTowerIdx].length === 0) {
    return false;
  } else if (this.stacks[endTowerIdx].length === 0) {
    return true;
  } else {
    return (this.stacks[startTowerIdx][0] < this.stacks[endTowerIdx][0]);
  }
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx) {

  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    var movingDisk = this.stacks[startTowerIdx].shift();
    // console.log(movingDisk);
    this.stacks[endTowerIdx].unshift(movingDisk);
    return true;
  }
  return false;
};

HanoiGame.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function(callback) {
  this.print();
  reader.question("What is the start tower? ", function(startTowerIdx){
    reader.question("What is the end tower? ", function(endTowerIdx){
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  var game = this;
  this.promptMove(function(startTowerIdx, endTowerIdx){
    if (game.move(startTowerIdx, endTowerIdx)){
      if (game.isWon()) {
        completionCallback();
      } else {
        game.run(completionCallback);
      }
    } else {
      throw "Move could not be completed, not valid.";
    }
  });
};

var a = new HanoiGame();
a.run(function() {
  console.log("You won!");
  reader.close();
});
