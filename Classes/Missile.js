class Missile {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 2; // maximum speed of the missile
        this.size = 10
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        // ellipse(this.pos.x, this.pos.y, 12)
        // draw the missile
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            // missile is out of bounds, don't draw it
            return;
        }
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + 90);
        fill(255);
        triangle(0, -this.size / 2, this.size / 2, this.size / 2, -this.size / 2, this.size / 2);
        pop();
    }
}
