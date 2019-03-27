class Item{
    constructor(){
        var geometry = new THREE.BoxGeometry(Settings.hexRadius/2,Settings.hexRadius/2,Settings.hexRadius/2)
        var box = new THREE.Mesh(geometry, Settings.wallMaterial);
        box.castShadow=true
        return box
    }
}