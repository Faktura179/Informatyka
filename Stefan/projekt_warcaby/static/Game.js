class Game{
    constructor(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            90,    // kąt patrzenia kamery (FOV - field of view)
            $(window).width()-5 / $(window).height()-5,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setClearColor(0x000000);
        renderer.setSize($(window).width()-5, $(window).height()-5);
        $("#root").append(renderer.domElement);
        camera.position.set(0, 0, 800)
        camera.lookAt(scene.position)
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)

        this.scene=scene
        this.camera=camera
        this.renderer=renderer

        this.render()
        window.onresize=this.resize.bind(this)
    }

    render() {
        this.animationFrame = requestAnimationFrame(this.render.bind(this));

        console.log("a")

        this.renderer.render(this.scene, this.camera);
    }
    resize(){
        this.camera.aspect = window.innerWidth-5 / window.innerHeight-5;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth-5, window.innerHeight-5 );
    }
}