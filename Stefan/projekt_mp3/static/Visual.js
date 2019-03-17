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
        renderer.setClearColor(0x000000);
        renderer.setSize($(window).width(), $(window).height());
        $("#root").append(renderer.domElement);
        camera.position.set(0, 400, 0)
        camera.lookAt(scene.position)
        var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
        var material = new THREE.MeshNormalMaterial()
        var mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh)

        this.scene=scene
        this.camera=camera
        this.renderer=renderer
        console.log(renderer)
        console.log(this.renderer)
        this.render()
    }

    render() {
        requestAnimationFrame(this.render.bind(this)); // bind(this) przekazuje this do metody render
        $("#anydiv").html(music.getData()) // wyświetlenie danych audio w div-ie
        this.renderer.render(this.scene, this.camera);
    }

}