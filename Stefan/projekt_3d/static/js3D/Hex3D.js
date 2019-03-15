class Hex3D {

    constructor(doors1, doors2){
       var container = new THREE.Object3D() // kontener na obiekty 3D
       var geometry = new THREE.BoxGeometry( Settings.hexRadius*2/Math.sqrt(3), Settings.hexRadius/2, Settings.hexRadius/25 );
       var wall = new THREE.Mesh(geometry, Settings.wallMaterial);
       for (var i = 0; i < 6; i++) {
            var side
           if(i==doors1 || i==doors2){
                side = new Doors3D();
           }
           else{
                side = wall.clone()
           }
           
           side.position.x = Math.cos(Math.PI*i/3)*Settings.hexRadius
           side.position.z = Math.sin(Math.PI*i/3)*Settings.hexRadius 
           side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
           container.add(side)
        
       }   

       return container

    }
    
    
}
