class Doors3D{
    constructor(){
        var container = new THREE.Object3D()
        var geometry = new THREE.BoxGeometry(Settings.hexRadius*2/(Math.sqrt(3)*3), Settings.hexRadius/2, Settings.hexRadius/25)
        var wall = new THREE.Mesh(geometry, Settings.wallMaterial);
        wall.castShadow=true
        wall.receiveShadow=true
        var wallLeft = wall.clone()
        wall.position.x=Settings.hexRadius*2/(Math.sqrt(3)*3)
        wallLeft.position.x=-Settings.hexRadius*2/(Math.sqrt(3)*3)

        container.add(wall)
        container.add(wallLeft)

        return container
    }
}