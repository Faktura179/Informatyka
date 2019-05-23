class Block extends THREE.Object3D {

    constructor (){
 
       super()
 
       // budowa elementów klocka (prostopadłościan i odpowiednia ilość cylindrów)
      var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
       var geometry = new THREE.BoxGeometry( 50, 30, 50 );
       var box = new THREE.Mesh(geometry)


       var singleGeometry = new THREE.Geometry();
       var singleMesh = new THREE.Mesh(singleGeometry, material);
       this.add(singleMesh)
    }
 }