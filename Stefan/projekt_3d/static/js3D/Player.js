class Player {

    constructor(){   
 
        this.container = new THREE.Object3D()
 
        //this.player = new THREE.Mesh(new THREE.BoxGeometry(100,100,100,3,3,3),new THREE.MeshBasicMaterial({wireframe:true, color:0x0000ff, transparent:true})); // player sześcian
        this.model= new Model()
        var that =this
        this.model.loadModel("/mats/tris.js", function(container, model){
            that.container.add(container)
            that.model.mixer = new THREE.AnimationMixer(model)
        })
        


        this.container.position.y=0
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