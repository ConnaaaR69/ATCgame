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
        this.trail = []
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

    render() {
        this.rotation = this.velocity.heading() + 90;
        strokeWeight(1);
        push();

        if(this.alert == true)
        {
            noFill()
            stroke(250,0,0)
            ellipse(this.pos.x,this.pos.y,40)
            stroke(0,255,0)
        }
        
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

        this.generateTrail()
        this.alert = false;       
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

    showLabels(str) {
        fill(0, 255, 0);
        noStroke();
        textSize(14);
        text(str, this.pos.x + 5, this.pos.y - 10);
        textSize(10);

        this.alert ? (fill(255, 0, 0)) : (fill(0, 0, 255));
        rect(this.pos.x + 16, this.pos.y + 20, 32, 10);
        fill (0)
        rect(this.pos.x +20, this.pos.y + 35, 40, 20);
        fill(255);
        text(this.callSign, this.pos.x, this.pos.y + 25);
        // text("y: "+Math.round(this.pos.y), this.pos.x, this.pos.y + 35);
        // text("x: "+Math.round(this.pos.x), this.pos.x, this.pos.y + 45);
        text("FL "+this.altitude, this.pos.x, this.pos.y + 35);
        text("IAS "+Math.round(p5.Vector.mag(this.velocity)*2200), this.pos.x, this.pos.y + 45);
        noFill();
    }

    generateTrail(){
        let trailRect = rect(this.pos.x, this.pos.y, 10)
        this.trail.push(trailRect);
        fill(255)
        // rect(this.pos.x, this.pos.y, 10)
        if(this.trail.length > 50){
            this.trail.pop()
        }
        console.log(this.trail)
    }

    checkLimits() {
        this.pos.x = ((this.pos.x % this.afWidth) + this.afWidth) % this.afWidth;
        this.pos.y = ((this.pos.y % this.afHeight) + this.afHeight) % this.afHeight;
    }


}