const Constants = require("./constants");
const fs = require("fs");
const path = require("path");

const sampleData = [[1, 2]];
let transitionMatrix = Object.keys(Constants.statesNum).map(() => {
  return new Array(Object.keys(Constants.statesNum).length).fill(0);
});
let initialVector = new Array(Object.keys(Constants.statesNum).length).fill(0);
let totalObservations = 0;
const totalOccurrences = new Array(
  Object.keys(Constants.statesNum).length
).fill(0);

sampleData.forEach((observation) => {
  if (observation.length > 0) {
    totalObservations++;
    initialVector[observation[0]]++;

    for (let i = 0; i < observation.length - 1; i++) {
      const iState = observation[i];
      const jState = observation[i + 1];
      transitionMatrix[iState][jState]++;
      totalOccurrences[iState]++;
    }
  }
});

initialVector = initialVector.map(
  (occurrences) => occurrences / totalObservations
);
transitionMatrix = transitionMatrix.map((stateTransitions, iState) =>
  stateTransitions.map((occurrences) =>
    totalOccurrences[iState] === 0 ? 0 : occurrences / totalOccurrences[iState]
  )
);

// Set transition dead to dead as 1
transitionMatrix[Constants.states.Dead][Constants.states.Dead] = 1;

const encodedMarkovChain =
`${initialVector.join()}
${transitionMatrix.map((row) => row.join()).join("\n")}`;

fs.writeFile(path.join(__dirname, "chain.txt"), encodedMarkovChain, (err) => {
  if (err) return console.error("Error while writing to markov chain document");
  console.log("Markov chain document created succesfully");
});
