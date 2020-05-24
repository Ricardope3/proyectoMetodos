<template>
  <div class="controls">
    <div class="simulations">
      <button :disabled="simulating" @click="beginSimulation">
        Iniciar Simulación
      </button>
    </div>
    <button :disabled="!simulating" @click="stopSimulation">
      Detener Simulación
    </button>
  </div>
</template>

<script>
import chainA from 'raw-loader!../markov-chains/markovChainA.txt';
import chainB from 'raw-loader!../markov-chains/markovChainA.txt';

import MarkovChain from '../markov-chain';

export default {
  name: 'UIControls',

  data() {
    return {
      simulating: false
    };
  },

  methods: {
    beginSimulation() {
      const gen1Chains = {
        chainA: new MarkovChain(chainA),
        chainB: new MarkovChain(chainB)
      };
      gen1Chains;
      this.simulating = true;
      this.$emit('start-simulation', gen1Chains);
    },

    stopSimulation() {
      this.simulating = false;
      this.$emit('stop-simulation');
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  padding: 3rem;

  .simulations {
    margin-bottom: 3rem;
  }

  button {
    width: 100%;
    height: 40px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    background-color: rgb(6, 97, 139);
    color: white;

    &:disabled {
      background-color: rgb(65, 66, 66);
      color: white;
    }
  }
}
</style>
