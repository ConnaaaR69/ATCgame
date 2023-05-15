class Helicopter extends Plane {
    constructor(_size = 0.19) {
        super();
        this.size = _size;
        this.oldVel = null;
        this.turnRate = 0.8
        this.rotation = this.velocity.heading() + 90;
    }

    /**
     * Renders the Helicopter sub-class.
     */
    render() {
        this.alert = false;
        super.render();
    }

    /**
     * Makes the helicopter object stationary
     */
    hover() {
        this.oldVel = createVector(this.velocity.x,this.velocity.y);
        this.velocity -= this.velocity;
    }

    /**
     * Draws the helicopter shape
     */
    draw() {
        if (this.alert == true) {
            noFill();
            stroke(255, 0, 0);
            ellipse(this.pos.x, this.pos.y, 40);
            stroke(0, 255, 0);
        }
        push();
        strokeWeight(5);
        stroke(255);
        translate(this.pos.x, this.pos.y);
        if (this.velocity > 0) rotate(this.velocity.heading() + 90);
        scale(this.size);
        line(0, 0, 0, 50);
        line(5, 50, 0, 50);
        push();
        rotate(degrees(45));
        rect(0, 0, 2, 30);
        rect(0, 0, 30, 2);
        pop();
        pop();
    }


    /**
     * Resumes the previous heading and velocity of the helicopter instance
     */
    unHover() {
        console.log('unhovering' + this.oldVel);
        if (this.velocity.x == 0 && this.velocity.y == 0) {
            this.velocity += this.oldVel;
        }
    }

    // Parent inherits
    checkLimits() {
        super.checkLimits();
    }

    faster() {
        super.faster();
    }

    slower() {
        super.slower();
    }
}