<template>
  <div id="container" ref="container"></div>
</template>

<script>
import { PerspectiveCamera, WebGLRenderer, Scene } from 'three';

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
      this.camera.position.y = 8;

      this.scene = new Scene();

      this.renderer = new WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );

      this.container.appendChild(this.renderer.domElement);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
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
