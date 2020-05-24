import { Group, Vector3 } from 'three';
import Constants from './constants';

class Villager extends Group {
  constructor(villager, position) {
    super();

    this.jumpUp = true;
    this.initialPosition = position.clone();
    const { x, y, z } = position;
    this.position.set(x, y, z);

    this.cooperative = false;
    this.hostile = false;
    this.attack = false;
    this.walkingTowards = false;

    this.target = new Vector3(0, 0, 0);

    setInterval(() => {
      if (this.markovChain) {
        this.markovChain.transition();
        this.activateState(this.markovChain.currentState);
      }
    }, 6000);

    this.add(villager);
  }

  startSimulation(chain) {
    this.markovChain = chain;
    this.activateState(this.markovChain.currentState);
  }

  stopSimulation() {
    this.stopWalkAnimation();
    this.markovChain = null;
  }

  setTarget(target) {
    this.target = target;
  }

  addApple(apple) {
    this.apple = apple;
    this.apple.visible = false;
    this.add(apple);
  }

  addSword(sword) {
    this.sword = sword;
    this.sword.visible = false;
    this.add(sword);
  }

  activateState(state) {
    switch (parseInt(state)) {
      case Constants.states.Cooperative:
        this.beginCooperative();
        break;
      case Constants.states.Hostile:
        this.beginHostile();
        break;
      case Constants.states.Engaged:
        this.beginAttack();
        break;
    }
  }

  beginAttack() {
    this.walkingTowards = true;
    this.attack = true;
    if (this.sword) this.sword.visible = true;
  }

  beginCooperative() {
    this.walkingTowards = true;
    this.cooperative = true;
    if (this.apple) this.apple.visible = true;
  }

  beginHostile() {
    this.walkingTowards = true;
    this.hostile = true;
  }

  stopWalkAnimation() {
    this.cooperative = false;
    this.hostile = false;
    if (this.sword) this.sword.visible = false;
    this.attack = false;
    this.position.x = this.initialPosition.x;
  }

  walkAnimation() {
    if (this.walkingTowards) {
      const delta = this.position.x < this.target.x ? 0.15 : -0.15;
      this.position.x += delta;
      if (Math.abs(this.position.x - this.target.x) < 0.5) {
        this.walkingTowards = false;
        if (this.cooperative && this.apple) this.apple.visible = false;
      }
    } else {
      const delta = this.position.x < this.initialPosition.x ? 0.15 : -0.15;
      this.position.x += delta;
      if (Math.abs(this.position.x - this.initialPosition.x) < 0.5) {
        this.stopWalkAnimation();
      }
    }
  }

  jumpAnimation() {
    const deltaJump = this.jumpUp ? 0.05 : -0.05;
    this.position.y += deltaJump;
    if (this.jumpUp && this.position.y > 1) this.jumpUp = false;
    else if (!this.jumpUp && this.position.y < 0) this.jumpUp = true;
  }

  animate() {
    this.jumpAnimation();

    if (this.apple?.visible) this.apple.rotation.y += 0.05;
    //if (this.sword?.visible) this.sword.rotation.z += 0.05;

    if (this.attack || this.hostile || this.cooperative) this.walkAnimation();
  }
}

export default Villager;
