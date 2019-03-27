class Hex3D {

    constructor(arrDoors){
       var container = new THREE.Object3D() // kontener na obiekty 3D
       var geometry = new THREE.BoxGeometry( Settings.hexRadius*2/Math.sqrt(3), Settings.hexRadius/2, Settings.hexRadius/25 );
       var wall = new THREE.Mesh(geometry, Settings.wallMaterial);
       for (var i = 0; i < 6; i++) {
            var side
            var door=false
            arrDoors.forEach(el => {
               if(el==i){
                door=true    
               }
            });
            if(door){
               side = new Doors3D();
            }else{
               side = wall.clone()
            }
           
           
           side.position.x = Math.cos(Math.PI*i/3)*Settings.hexRadius
           side.position.z = Math.sin(Math.PI*i/3)*Settings.hexRadius 
           side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
           side.castShadow=true
           side.receiveShadow=true
           container.add(side)
        
       }   

     var geometry = new THREE.CylinderGeometry( Settings.hexRadius*2/Math.sqrt(3), Settings.hexRadius*2/Math.sqrt(3), 1, 6 );
     var cylinder = new THREE.Mesh( geometry, Settings.wallMaterial );
     cylinder.position.y=-Settings.hexRadius/4
     cylinder.receiveShadow=true
     container.add( cylinder );

       return container

    }
    
    
}
