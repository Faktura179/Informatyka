class Visual {

    constructor() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            90,    // kąt patrzenia kamery (FOV - field of view)
            $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize($(window).width(), $(window).height());
        $("#root").append(renderer.domElement);
        camera.position.set(0, 0, 800)
        camera.lookAt(scene.position)
        this.cubes=[]
        for(var i =0;i<music.getData().length;i++){
            var geometry = new THREE.BoxBufferGeometry( 25, 1, 1 );
            var material = new THREE.MeshNormalMaterial()
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x=-800+i*50
            scene.add(mesh)
            this.cubes.push(mesh)
            console.log("a")
        }

        this.scene=scene
        this.camera=camera
        this.renderer=renderer
        this.render()
    }

    render() {
        requestAnimationFrame(this.render.bind(this)); // bind(this) przekazuje this do metody render
        var arr = music.getData()
        this.cubes.forEach((el,index)=>{
            el.scale.y=arr[index]*2
        })
        this.renderer.render(this.scene, this.camera);
    }

}