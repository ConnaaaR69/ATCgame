class Plane {
    constructor(afWidth = width, afHeight = height) {
        this.pos = createVector(random(0, afWidth), random(0, afHeight));
        this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
        this.alert = false;
        this.selected = false;
        this.altitude = Math.random() >= 0.5 ? 1000 : 2000;
        this.rotation = this.velocity.heading() + 90;
        this.afWidth = afWidth;
        this.afHeight = afHeight;
        this.callSign = this.generateCallsign();
        this.trail = [];
        this.target = null;
        this.turnRate = 0.05;

        if (this.constructor == Plane) {
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }

    render() {
        this.draw();
        this.step();
        this.checkLimits();
        this.turnHeading();
        this.checkAlert();
        this.generateTrail();
    }

    faster() {
        this.velocity.mult(1.5);
    }

    slower() {
        this.velocity.mult(0.5);
    }

    turnLeft() {
        this.velocity.rotate(-15);
        rotate(this.velocity.heading + 90);
    }
    turnRight() {
        this.velocity.rotate(15);
        rotate(this.velocity.heading + 90);
    }

    step() {
        this.pos.add(this.velocity);
    }

    draw() {
        this.rotation = this.velocity.heading() + 90;
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        scale(this.size);
        strokeWeight(5);
        stroke(255);
        beginShape();
        vertex(0, 0);
        vertex(apWidth / 2, apTail);
        vertex(0, -apHeight);
        vertex(-(apWidth / 2), apTail);
        vertex(0, 0);
        endShape();
        pop();
    }

    showLabels(str) {
        let red = color(255, 0, 0);
        let blue = color(0, 0, 255);

        fill(0, 255, 0);
        noStroke();
        textSize(14);
        text(str, this.pos.x + 5, this.pos.y - 10);
        textSize(10);

        this.alert ? (fill(red)) : (fill(blue));
        rect(this.pos.x + 16, this.pos.y + 20, 32, 10);
        fill(0);
        rect(this.pos.x + 20, this.pos.y + 35, 40, 20);
        fill(255);
        text(this.callSign, this.pos.x, this.pos.y + 25);
        text("FL " + this.altitude, this.pos.x, this.pos.y + 35);
        text("IAS " + Math.round(p5.Vector.mag(this.velocity) * 2200), this.pos.x, this.pos.y + 45);
        noFill();
    }

    setTarget(target) {
        this.target = target;
    }

    turnHeading() {
        if (this.target != null) {
            let targetDist = p5.Vector.dist(this.target, this.pos);
            if (targetDist <= 1) {
                // Plane has reached the target, set velocity directly towards it
                let targetDir = p5.Vector.sub(this.target, this.pos);
                // targetDir.normalize();
                this.velocity = targetDir.mult(p5.Vector.mag(this.velocity));
                this.target = null;
                return;
            } else {
                // Plane hasn't reached the target yet, adjust heading as before
                let targetDir = p5.Vector.sub(this.target, this.pos);
                let currentDir = this.velocity.copy();
                let angle = currentDir.angleBetween(targetDir);

                let maxTurnAngle = this.turnRate * deltaTime;
                if (angle > maxTurnAngle) angle = maxTurnAngle;
                if (angle < -maxTurnAngle) angle = -maxTurnAngle;

                currentDir.rotate(angle);
                this.velocity = currentDir.copy().add(this.velocity / 2);
            }

            // Draw the target marker
            let radius = 100
            push();
            strokeWeight(1)
            stroke(255, 255, 0);
            noFill();
            push ()
            translate(this.target.x, this.target.y)
            beginShape()
            for(let i = 0; i > 359; i+= 360 / 6) {
                let x = radius * cos(i);
                let y = radius * sin(i);
                vertex(x,y);
            }
            endShape(CLOSE)
            pop ()
            
            rect(this.target.x, this.target.y, 5)
            noStroke()
            fill(255,255,0)
            textSize(10)
            text(this.callSign + " WP1", this.target.x,this.target.y-10)
            pop();
        }
    }


    generateCallsign() {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        let result = '';
        for (let i = 0; i < 2; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        for (let i = 0; i < 3; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result.toUpperCase();
    }

    generateTrail() {
        this.trail.push({ x: this.pos.x, y: this.pos.y });
        fill(255);

        if (this.trail.length > 2500) {
            // this.trail.shift();
        }
        stroke(1, 1, 1, 50);
        noFill();
        beginShape();
        for (let i = 0; i < this.trail.length; i++) {
            vertex(this.trail[i].x, this.trail[i].y);
        }
        endShape();
    }

    clearTrail() {
        this.trail.splice(0,this.trail.length)
    }

    checkAlert() {
        if (this.alert == true) {
            noFill();
            stroke(250, 0, 0);
            ellipse(this.pos.x, this.pos.y, 40);
            // stroke(0, 255, 0);
        }

        this.alert = false;
    }

    checkLimits() {
        this.pos.x = ((this.pos.x % this.afWidth) + this.afWidth) % this.afWidth;
        if (this.pos.x == 0 || this.pos.x == width) 
        
        this.pos.y = ((this.pos.y % this.afHeight) + this.afHeight) % this.afHeight;
        if (this.pos.y == 0 || this.pos.y == height) this.clearTrail()
    }


}