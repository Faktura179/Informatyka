var Settings = {

    hexRadius: 300,
    wallMaterial: new THREE.MeshPhongMaterial({/*color:0xff0000,*/ /*side: THREE.DoubleSide,*/ map: new THREE.TextureLoader().load("/mats/walls_texture.png")}),
    floorMaterial:new THREE.MeshPhongMaterial({/*color: 0xffff00,*/ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("/mats/floor_texture.jpg")})
}