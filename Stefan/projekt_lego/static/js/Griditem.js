class Griditem extends THREE.Object3D {

    constructor (){
 
        super()
 
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(50, 0, 0));
        

        var line = new THREE.Line(geometry, lineMaterial);
    }
 }