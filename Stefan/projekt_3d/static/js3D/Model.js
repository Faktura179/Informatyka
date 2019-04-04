class Model{
    constructor(texture){
        this.container = new THREE.Object3D()
        this.mixer=null
        this.model=null
        this.texture=texture
    }
    
    loadModel(url, callback){
        var material = new THREE.MeshPhongMaterial(
            {
                map: new THREE.TextureLoader().load(this.texture),
                morphTargets: true // ta własność odpowiada za animację materiału modelu
            });
        var loader = new THREE.JSONLoader()
        var that = this
        loader.load(url, function(geometry){
            var model = new THREE.Mesh(geometry, material)
            model.position.y=0
            model.rotation.y = Math.PI*3/2; // ustaw obrót modelu
            model.scale.set(Settings.hexRadius/100,Settings.hexRadius/100,Settings.hexRadius/100); // ustaw skalę modelu
            that.container.add(model)
            that.model=model
            model.castShadow=true
            model.receiveShadow=true
            that.mixer=new THREE.AnimationMixer(model)
            callback(that.container,model)
        })
    }

    // update mixera

    updateModel (delta) {
        if (this.mixer) this.mixer.update(delta)
    }

   //animowanie postaci

    setAnimation () {
        if (this.mixer) this.mixer.clipAction("run").play();
    }

    stopAnimation(){
        if (this.mixer) this.mixer.uncacheRoot(this.model)
    }
}