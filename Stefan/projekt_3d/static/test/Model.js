class Model{
    constructor(){
        this.container = new THREE.Object3D()
        this.mixer=null
        this.model=null
    }
    
    loadModel(url, callback){
        var material = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("/mats/tucow_model.png"),
                morphTargets: true // ta własność odpowiada za animację materiału modelu
            });
        var loader = new THREE.JSONLoader()
        var that = this
        loader.load(url, function(geometry){
            var model = new THREE.Mesh(geometry, material)
            console.log(geometry.animations)
            model.position.y=150
            model.rotation.y = Math.PI*3/2; // ustaw obrót modelu
            model.scale.set(5,5,5); // ustaw skalę modelu
            that.container.add(model)
            that.model=model
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