class Light{
    constructor(){
        var light = new THREE.PointLight( 0xffffff, 10, 0, 2 );
        var geometry = new THREE.BoxGeometry(2,2,2)
        var box = new THREE.Mesh(geometry, Settings.wallMaterial);
        light.castShadow=true
        light.shadow.camera.far=Settings.hexRadius*5
        light.add(box)
        return light
    }
}