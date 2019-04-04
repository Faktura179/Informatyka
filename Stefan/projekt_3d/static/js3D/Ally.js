class Ally extends THREE.Object3D{
    constructor(){
        super()
        this.model=new Model("/mats/tucow_model1.png")
        this.model.loadModel("/mats/tris.js",(container,model)=>{
            this.add(container)
        })
        this.ring = new Ring()
        this.add(this.ring)
        console.log(this)
    }

    move(directionVect,clickedVect,speed,i){
        if(this.position.clone().distanceTo(clickedVect)>speed+0.1+Settings.hexRadius/4*i){
            
            this.translateOnAxis(directionVect, speed)
            this.model.setAnimation()
        }else{
            this.translateOnAxis(directionVect, 0)
            this.model.stopAnimation()
        }
    }
}