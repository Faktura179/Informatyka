class Hex3D {

    constructor(doors1, doors2){
       var container = new THREE.Object3D() // kontener na obiekty 3D
       var geometry = new THREE.BoxGeometry( 50, 500, 1000 );
       var wall = new THREE.Mesh(geometry, Settings.wallMaterial);
       for (var i = 0; i < 6; i++) {
           var side = wall.clone()
           side.position.x = 100*i
           side.position.z = 100*i       
           side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
           container.add(side)
        
       }   

       return container

    }
    
    
}
