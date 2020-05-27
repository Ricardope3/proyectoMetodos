import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  Vector3,
  Color
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Villager from './villager';

class Scenography extends Scene {
  constructor() {
    super();

    const light = new AmbientLight('white', 2);
    const dirLight = new DirectionalLight('white', 2);
    this.add(light);
    this.add(dirLight);

    this.background = new Color(0xff87ceeb);

    const terrain = new Mesh(
      new PlaneGeometry(90, 30, 1),
      new MeshBasicMaterial({
        map: new TextureLoader().load('assets/textures/grass.jpg')
      })
    );
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y -= 3;
    this.add(terrain);

    this.loadScene();
  }

  startSimulation({ chainA, chainB }) {
    this.villagerA.startSimulation(chainA);
    this.villagerB.startSimulation(chainB);
  }

  stopSimulation() {
    this.villagerA.stopSimulation();
    this.villagerB.stopSimulation();
  }

  async loadScene() {
    const loader = new GLTFLoader();

    await this.loadVillagers();

    this.villagerA.setTarget(this.villagerB.position);
    this.villagerB.setTarget(this.villagerA.position);

    loader.load(
      'assets/apple/scene.gltf',
      gltf => {
        gltf.scene.scale.set(4, 4, 4);
        const appleA = gltf.scene.clone();
        appleA.position.set(0, -10, 9);
        const appleB = gltf.scene.clone();
        appleB.position.set(0, -10, 9);
        this.villagerA.addApple(appleA);
        this.villagerB.addApple(appleB);
      },
      undefined,
      function(error) {
        console.error(error);
      }
    );

    loader.load(
      'assets/sword/scene.gltf',
      gltf => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        const swordA = gltf.scene.clone();
        swordA.position.set(0, -12, 0);
        swordA.rotation.y = -Math.PI / 2;
        const swordB = gltf.scene.clone();
        swordB.position.set(0, -12, 0);
        swordB.rotation.y = -Math.PI / 2;
        this.villagerA.addSword(swordA);
        this.villagerB.addSword(swordB);
      },
      undefined,
      function(error) {
        console.error(error);
      }
    );
  }

  async loadVillagers() {
    const loader = new GLTFLoader();

    return Promise.all([
      new Promise(resolve => {
        loader.load(
          'assets/villager/scene.gltf',
          gltf => {
            this.villagerA = new Villager(gltf.scene, new Vector3(-13, 0, 0));

            this.villagerA.scale.set(0.1, 0.1, 0.1);
            this.villagerA.rotation.y = Math.PI / 2;
            this.add(this.villagerA);
            resolve();
          },
          undefined,
          function(error) {
            console.error(error);
            resolve();
          }
        );
      }),
      new Promise(resolve => {
        loader.load(
          'assets/villager/scene.gltf',
          gltf => {
            this.villagerB = new Villager(gltf.scene, new Vector3(13, 0, 0));
            this.villagerB.scale.set(0.1, 0.1, 0.1);
            this.villagerB.rotation.y = -Math.PI / 2;
            this.add(this.villagerB);
            resolve();
          },
          undefined,
          function(error) {
            console.error(error);
            resolve();
          }
        );
      })
    ]);
  }

  animate() {
    if (this.villagerA) this.villagerA.animate();
    if (this.villagerB) this.villagerB.animate();
  }
}

export default Scenography;
