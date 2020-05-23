const Constants = require("./constants");
const fs = require("fs");
const path = require("path");

class MarkovChain {
  constructor(encodedChain) {
    const lines = encodedChain.split("\n");
    if (lines.length !== Object.keys(Constants.states).length + 1)
      return console.error("Bad encoded markov chain file");
    this.initialVector = lines[0].split(",").map((_) => parseFloat(_));
    this.transitionMatrix = lines
      .slice(1)
      .map((_) => _.split(",").map((_) => parseFloat(_)));
    this.currentState = this._getStateFromProbabilities(this.initialVector);
  }

  _getStateFromProbabilities(probabilityRow) {
    const rand = Math.random();
    let accumProbability = 0;
    for (let state in probabilityRow) {
      accumProbability += probabilityRow[state];
      if (rand <= accumProbability) return state;
    }
  }

  transition() {
    this.currentState = this._getStateFromProbabilities(
      this.transitionMatrix[this.currentState]
    );
    return this.currentState;
  }
}

fs.readFile(path.join(__dirname, "markovChainA.txt"), "utf8", (err, data) => {
  if (err) return console.error("Cannot read file");
  const chain = new MarkovChain(data);
  console.log(Constants.statesNum[chain.currentState]);
  setInterval(() => {
    const newState = chain.transition();
    console.log(Constants.statesNum[newState]);
  }, 1000);
});
