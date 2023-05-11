class Radar {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = width / 2 - (width / 2 * 0.05);
        this.sweepAngle = 1;
        this.angle = -90;

        //this essentially creates a new renderer that can display separately to the main renderer
        this.radarBeam = createGraphics(width, height);

    }

    update() {
        this.radarBeam.background(50, 50, 50, 10);
        this.angle += this.sweepAngle;
        this.radarBeam.ellipse(this.x, this.y, 5);

        this.radarBeam.strokeWeight(2);
        this.radarBeam.stroke(0, 200, 0);

        this.radarBeam.fill(0, 255, 0);
        this.radarBeam.arc(this.x, this.y, this.radius * 2, this.radius * 2, radians(this.angle - this.sweepAngle), radians(this.angle));

        
        image(this.radarBeam, 0, 0);
    }
}
