class Ring extends THREE.Mesh{
    constructor(geometry,material){
        if(arguments.length==2) super(geometry, material)
        else{
            super()
            this.material=new THREE.MeshBasicMaterial({color:0x00ff00, side:THREE.DoubleSide, transparent:true, opacity:0.5})
            this.geometry = new THREE.RingGeometry(Settings.hexRadius/4,Settings.hexRadius*3/8,6)
            this.rotation.x=Math.PI/2
            this.position.y=-Settings.hexRadius/4+1
        }
    }
}