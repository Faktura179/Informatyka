class Player {

    constructor(){   
 
        this.container = new THREE.Object3D()
 
        //this.player = new THREE.Mesh(new THREE.BoxGeometry(100,100,100,3,3,3),new THREE.MeshBasicMaterial({wireframe:true, color:0x0000ff, transparent:true})); // player sześcian
        this.model= new Model("/mats/tucow_model1.png")
        var that =this
        this.model.loadModel("/mats/tris.js", function(container, model){
            that.container.add(container)
        })
        


        this.container.position.y=0
    }
 
    move(directionVect,clickedVect,speed){
        if(this.getPlayerCont().position.clone().distanceTo(clickedVect)>speed+0.1){
            
            this.getPlayerCont().translateOnAxis(directionVect, speed)
            this.model.setAnimation()
        }else{
            this.getPlayerCont().translateOnAxis(directionVect, 0)
            this.model.stopAnimation()
        }
    }
 
     //funkcja zwracająca kontener
 
     getPlayerCont () {
         return this.container
     }
 
     //funkcja zwracająca playera
 
     getPlayerMesh () {
         return this.model.container
     }
 
 }