import Constants from './constants';

class MarkovChain {
  constructor(encodedChain) {
    const lines = encodedChain.split('\n');
    if (lines.length !== Object.keys(Constants.states).length + 1)
      return console.error('Bad encoded markov chain file');
    this.initialVector = lines[0].split(',').map(_ => parseFloat(_));
    this.transitionMatrix = lines
      .slice(1)
      .map(_ => _.split(',').map(_ => parseFloat(_)));
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

export default MarkovChain;
