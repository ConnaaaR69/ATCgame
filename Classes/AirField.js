class AirField {
    constructor(afWidth, afHeight, num) {
        this.planes = [];
        this.airFieldWidth = afWidth;
        this.airFieldHeight = afHeight;
        this.num = num;
        this.generatePlanes(this.num);
        this.color = color(0, 255, 0);
    }

    /**
     * Generates random aircraft objects to an array.
     * @param {Number} num 
     */
    generatePlanes(num) {
        for (let i = 0; i < num+1; i++) {
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

    /**
     * Handles the drawing, movement, constraining and distance warnings of the plane objects.
     */
    flyPlanes() {
        fill(150);
        text(this.planes.length - (-this.planes.length, 50, 50));

        stroke(this.color);
        noFill();
        rectMode(CENTER);
        ellipseMode(CENTER); 5;
        ellipse(width / 2, height / 2, this.airFieldWidth + 25, this.airFieldHeight + 25);

        const radius = width / 2
        this.planes.forEach(plane => {
            
            if (!AirField.inCircle(radius, radius, radius - (radius * 0.05), plane, plane)) {
                plane.clearTrail()
                return;
            }
            plane.render();
            plane.showLabels(this.planes.indexOf(plane));           
        });
        this.checkPlanes();
    }

   
    /**
     * This method checks the distance between the planes in the AirField planes array
     */
    checkPlanes() {
        for (let i = 0; i < this.planes.length; i++) {
            for (let j = (i + 1); j < this.planes.length; j++) {
                if (j == i) break;

                let v1 = this.planes[i].pos;
                let v2 = this.planes[j].pos;
                let res = p5.Vector.sub(v1, v2);

                if (p5.Vector.mag(res) <= 40) {
                    this.planes[i].alert = true;
                    this.planes[j].alert = true;
                }
            }
        }
    }

     /**
    * Checks if the given vector object is within a defined circle.
    * @param {Number} cx x coordinate for the circle
    * @param {Number} cy y coordinate for the circle
    * @param {Number} rad Radius of the circle
    * @param {Object} object Vector object to check
    * @returns
    */
     static inCircle(cx, cy, rad, object) {
        let sqDist = Math.pow((object.pos.x - cx), 2) / Math.pow(rad, 2) + Math.pow((object.pos.y - cy), 2) / Math.pow(rad, 2);

        if (sqDist > 1) return false;
        return true;
    }
}