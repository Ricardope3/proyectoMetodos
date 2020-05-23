const Constants = require("./constants");
const fs = require("fs");
const path = require("path");

function generateMarkovChain(data, outputFile) {
  const rawData = data
    .split("\n")
    .map((_) => _.split(" ").map((_) => parseInt(_)));

  let transitionMatrix = Object.keys(Constants.statesNum).map(() => {
    return new Array(Object.keys(Constants.statesNum).length).fill(0);
  });
  let initialVector = new Array(Object.keys(Constants.statesNum).length).fill(
    0
  );
  let totalObservations = 0;
  const totalOccurrences = new Array(
    Object.keys(Constants.statesNum).length
  ).fill(0);

  rawData.forEach((observation) => {
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
      totalOccurrences[iState] === 0
        ? 0
        : occurrences / totalOccurrences[iState]
    )
  );

  // Set transition dead to dead as 1
  transitionMatrix[Constants.states.Dead][Constants.states.Dead] = 1;

  const encodedMarkovChain = `${initialVector.join()}\n${transitionMatrix
    .map((row) => row.join())
    .join("\n")}`;

  fs.writeFile(path.join(__dirname, outputFile), encodedMarkovChain, (err) => {
    if (err)
      return console.error("Error while writing to markov chain document");
    console.log(`Markov chain document ${outputFile} created succesfully`);
  });
}

fs.readFile(path.join(__dirname, "observacionesA.csv"), "utf8", (err, data) => {
  if (err) return console.error("Cannot read file");
  generateMarkovChain(data, "markovChainA.txt");
});

fs.readFile(path.join(__dirname, "observacionesB.csv"), "utf8", (err, data) => {
  if (err) return console.error("Cannot read file");
  generateMarkovChain(data, "markovChainB.txt");
});
