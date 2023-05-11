class SmallPlane extends Plane {
    constructor(_size = 0.12){
        super()
        this.size = _size
    }
   
    render(){
          
        push()

        super.render();
        pop()
          
    }

    checkLimits(){
        super.checkLimits()
    }

    faster(){
        super.faster()
    }

    slower(){
        super.slower()
    }
}