<template>
  <div id="app">
    <paint-canvas class="paint-canvas" ref="paintCanvas" />
    <UIControls
      class="ui-controls"
      @start-simulation="startSimulation"
      @stop-simulation="stopSimulation"
    />
  </div>
</template>

<script>
import PaintCanvas from './components/PaintCanvas';
import UIControls from './components/UIControls';

export default {
  name: 'App',
  components: {
    PaintCanvas,
    UIControls
  },

  methods: {
    startSimulation(chains) {
      this.$refs.paintCanvas.startSimulation(chains);
    },

    stopSimulation() {
      this.$refs.paintCanvas.stopSimulation();
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  height: 100%;

  .paint-canvas {
    flex: 4;
    height: 100%;
  }

  .ui-controls {
    flex: 1;
  }
}
</style>
