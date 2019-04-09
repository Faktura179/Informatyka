class Ally extends THREE.Object3D{
    constructor(){
        super()
        this.model=new Model("/mats/tucow_model1.png")
        this.model.loadModel("/mats/tris.js",(container,model)=>{
            this.add(container)
        })
        this.ring = new Ring()
        this.add(this.ring)
        this.isMoving=false
    }

    move(clicked,speed,i){
        clicked = clicked || new THREE.Vector3(0,0,0);
        var dir = clicked.clone().sub(this.position).normalize()
        if(this.position.clone().distanceTo(clicked)>speed+0.1+Settings.hexRadius/2*(i+1) && this.isMoving){
            var angle = Math.atan2(
                this.position.clone().x - clicked.x,
                this.position.clone().z - clicked.z
            )
            this.model.container.rotation.y = angle
            this.translateOnAxis(dir, speed-0.5)
            this.model.setAnimation()
        }else{
            this.translateOnAxis(dir, 0)
            this.model.stopAnimation()
        }
    }
}