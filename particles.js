import { ball } from './ball.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let trailPartilcesLimit = 140;
export let trailParticlesArr = [];
export class TrailParticle {
    constructor() {
        this.position = {
            x: ball.position.x + Math.random() * ball.diameter,
            y: ball.position.y + Math.random() * ball.diameter,
        };
        this.diameter = Math.random() * 13 + 3;
        this.opacity = 80;
        this.velocity = Math.random() * 10 + 5;
        this.direction = {
            x: -ball.direction.x,
            y: Math.random() * (-ball.direction.y - ball.direction.y / 2) * 2,
        };
    }
    update() {
        this.diameter *= 1.02;
        this.opacity *= 0.96;
        this.position.x += (this.direction.x * this.velocity) / 2;
        this.position.y += this.direction.y * this.velocity;
    }
    draw() {
        ctx.fillStyle = `rgba(255,255,255, ${this.opacity}%)`;
        ctx.fillRect(this.position.x, this.position.y, this.diameter, this.diameter);
    }
}

let hitParticlesLimit = 80;
export let hitParticlesArr = [];
export class HitParticle {
    constructor() {
        this.position = {
            x: ball.position.x + Math.random() * ball.diameter,
            y: ball.position.y + Math.random() * ball.diameter,
        };
        this.diameter = Math.random() * 7 + 4;
        this.opacity = 80;
        this.velocity = Math.random() * 10 + 5;
        this.direction = {
            x: Math.random() * 4 - 2,
            y: Math.random() * 4 - 2,
        };
    }
    update() {
        this.diameter *= 1.05;
        this.opacity *= 0.93;
        this.position.x += this.direction.x * this.velocity;
        this.position.y += this.direction.y * this.velocity;
    }
    draw() {
        ctx.fillStyle = `rgba(255,255,255, ${this.opacity}%)`;
        ctx.fillRect(this.position.x, this.position.y, this.diameter, this.diameter);
    }
}

export function hitParticles(quantity) {
    for (let i = 0; i < quantity; i++) {
        hitParticlesArr.push(new HitParticle());
    }
}

export function particleHandler() {
    if (trailParticlesArr.length > trailPartilcesLimit) trailParticlesArr.shift();
    trailParticlesArr.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    if (hitParticlesArr.length > hitParticlesLimit) hitParticlesArr.splice(1, 20);
    hitParticlesArr.forEach((particle) => {
        particle.update();
        particle.draw();
    });
}
export function resetParticles() {
    hitParticlesArr = [];
    trailParticlesArr = [];
}
