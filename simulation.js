const Constants = require("./constants");

class MarkovChain {
  constructor() {
    const sampleData = [
      [1, 2]
    ];
    this.transitionMatrix = Object.keys(Constants.statesNum).map(() => {
      return new Array(Object.keys(Constants.statesNum).length).fill(0);
    });
    this.initialVector = new Array(
      Object.keys(Constants.statesNum).length
    ).fill(0);
    let totalObservations = 0;
    const totalOccurrences = new Array(
      Object.keys(Constants.statesNum).length
    ).fill(0);

    sampleData.forEach((observation) => {
      if (observation.length > 0) {
        totalObservations++;
        this.initialVector[observation[0]]++;

        for (let i = 0; i < observation.length - 1; i++) {
          const iState = observation[i];
          const jState = observation[i + 1];
          this.transitionMatrix[iState][jState]++;
          totalOccurrences[iState]++;
        }
      }
    });

    this.initialVector = this.initialVector.map(
      (occurrences) => occurrences / totalObservations
    );
    this.transitionMatrix = this.transitionMatrix.map(
      (stateTransitions, iState) =>
        stateTransitions.map((occurrences) =>
          totalOccurrences[iState] === 0
            ? 0
            : occurrences / totalOccurrences[iState]
        )
    );
    console.log(this.transitionMatrix);
  }
}

new MarkovChain();
