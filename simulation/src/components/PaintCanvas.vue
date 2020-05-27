<template>
  <div id="container" ref="container"></div>
</template>

<script>
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Scenography from '../scenography';

export default {
  name: 'PaintCanvas',

  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      container: null,
      mesh: null
    };
  },

  mounted() {
    this.init();
    this.animate();
  },

  methods: {
    init() {
      this.container = this.$refs.container;

      this.camera = new PerspectiveCamera(
        70,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        100
      );
      this.camera.position.z = 15;
      this.camera.position.y = 2;

      this.scene = new Scenography();

      this.renderer = new WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );

      new OrbitControls(this.camera, this.renderer.domElement);

      this.container.appendChild(this.renderer.domElement);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.scene.animate();
      this.renderer.render(this.scene, this.camera);
    },

    startSimulation(chains) {
      this.scene.startSimulation(chains);
    },

    stopSimulation() {
      this.scene.stopSimulation();
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 700px;
  height: 600px;
}
</style>
