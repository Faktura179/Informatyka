class Grid{
    constructor(){
        var geometry=new THREE.PlaneGeometry( 1400, 1400 ,10,10);
        var material=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,side:THREE.DoubleSide})
        this.plane = new THREE.Mesh(geometry,material)
        this.plane.rotation.x=Math.PI/2
    }

    sceneAdd(scene){
        scene.add(this.plane)
    }
}
