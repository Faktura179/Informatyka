class Player {

    constructor(){   
 
        this.container = new THREE.Object3D()
 
        this.player = new THREE.Mesh(new THREE.BoxGeometry(100,100,100,3,3,3),new THREE.MeshBasicMaterial({wireframe:true, color:0x0000ff, transparent:true})); // player sześcian
 
        this.container.add(this.player) // kontener w którym jest player
 
        this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
 
        this.container.add(this.axes)

        this.container.position.y=50
    }
 
 
 
     //funkcja zwracająca kontener
 
     getPlayerCont () {
         return this.container
     }
 
     //funkcja zwracająca playera
 
     getPlayerMesh () {
         return this.player
     }

     getAxes(){
         return this.axes
     }
 
 }