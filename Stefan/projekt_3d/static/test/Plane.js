class Plane{
    constructor(){
        var container= new THREE.Object3D()
        var geometry = new THREE.PlaneGeometry( 1000, 1000, 8,8 );
        var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, wireframe:true} );
        var plane = new THREE.Mesh( geometry, material );
        var plane2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xcccccc,side:THREE.DoubleSide}))
        plane.rotation.x=Math.PI/2
        plane2.rotation.x=Math.PI/2
        plane2.position.y=-1
        container.add(plane)
        container.add(plane2)
        this.container=container
    }
    getContainer(){
        return this.container
    }
}