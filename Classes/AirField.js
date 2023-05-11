class AirField {
    constructor(afWidth, afHeight, num) {
        this.planes = [];
        this.airFieldWidth = afWidth;
        this.airFieldHeight = afHeight;
        this.num = num;
        this.generatePlanes(this.num);
        this.color = color(0, 255, 0);
    }

    generatePlanes(num) {
        for (let i = 0; i < 6; i++) {
            let randomNum = floor(random(0, 4));

            if (randomNum == 0) {
                this.planes.push(new SmallPlane());
            } else if (randomNum == 1) {
                this.planes.push(new MediumPlane());
            } else if (randomNum == 2) {
                this.planes.push(new Helicopter());
            } else {
                this.planes.push(new LargePlane());
            }
        }
    }

    flyPlanes() {
        fill(150);
        text(this.planes.length - (-this.planes.length, 50, 50));

        stroke(this.color);
        noFill();
        rectMode(CENTER);
        ellipseMode(CENTER); 5;
        ellipse(width / 2, height / 2, this.airFieldWidth + 25, this.airFieldHeight + 25);
        function inCircle(cx, cy, rad, x, y) {
            let sqDist = Math.pow((x - cx), 2) / Math.pow(rad, 2) + Math.pow((y - cy), 2) / Math.pow(rad, 2);
            if (sqDist > 1) return true;
            return false;
        }

        this.planes.forEach(plane => {
            plane.step();
            if (!inCircle(width / 2, width / 2, width / 2 - (width / 2 * 0.05), plane.pos.x, plane.pos.y)) {
                plane.showLabels(this.planes.indexOf(plane));
                plane.render();
            }

            plane.checkLimits();
        });
        this.checkPlanes();

    }

    inCircle(cx, cy, rad, x, y) {
        let sqDist = Math.pow((x - cx), 2) / Math.pow(rad, 2) + Math.pow((y - cy), 2) / Math.pow(rad, 2);
        if (sqDist > 1) return true;
        return false;
    }

    checkPlanes() {
        for (let i = 0; i < this.planes.length; i++) {
            for (let j = (i + 1); j < this.planes.length; j++) {
                if (j == i) break;


                let v1 = this.planes[i].pos;
                let v2 = this.planes[j].pos;
                //    rect (v1.x,v1.y,25)
                let res = p5.Vector.sub(v1, v2);
            
                if (p5.Vector.mag(res) <= 40) {
                    this.planes[i].alert = true;
                    this.planes[j].alert = true;
                    if (p5.Vector.mag(res) <= 5) {
                        // this.planes.splice(i, 1);
                        // this.planes.splice(j, 1);
                    }
                   

                }

            }
        }
    }
}