// @ts-nocheck

// 壁との衝突を検知
export class CollisionChecker {
  constructor(target) {
    this.target = target;
  }

  check() {
    const r = this.target.position.x >= width - this.target.size.width / 2; // right collision
    const l = this.target.position.x <= 0 + this.target.size.width / 2; // left collision
    const t = this.target.position.y <= 0 + this.target.size.height / 2; // top collision
    const b = this.target.position.y >= height - this.target.size.height / 2; // bottom collision
    return { t, r, b, l };
  }
}

export class Mover {
  constructor(target, speedSeed) {
    this.target = target.v;
    this.speedSeed = speedSeed;
    this.s = createVector(
      random(-this.speedSeed, this.speedSeed),
      random(-this.speedSeed, this.speedSeed)
    );
  }
  reverse(axis) {
    axis === 'x' && (this.s.x *= -1);
    axis === 'y' && (this.s.y *= -1);
  }
  move() {
    this.target.add(this.s);
  }
}