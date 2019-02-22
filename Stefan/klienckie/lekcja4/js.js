$(document).ready(function () {
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
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $("#root").append(renderer.domElement);
    camera.position.set(400, 400, 400)
    camera.lookAt(scene.position)

    var grid = new Grid()
    grid.sceneAdd(scene)

    var modelMaterial = new THREE.MeshBasicMaterial(
        {
            map: new THREE.TextureLoader().load("models/ctf.png"),
            morphTargets: true // ta własność odpowiada za animację materiału modelu
        });
    var animations = []
    var clones=[]
    var loader = new THREE.JSONLoader();
    var mixer
    loader.load('models/tris.js', function (geometry) {

        meshModel = new THREE.Mesh(geometry, modelMaterial)
        meshModel.name = "skeleton";
        meshModel.rotation.y = 15; // ustaw obrót modelu
        meshModel.position.y = 200; // ustaw pozycje modelu
        meshModel.scale.set(8, 8, 8); // ustaw skalę modelu

        //

        scene.add(meshModel);
        console.log(geometry.animations)
        for (var i = 0; i < geometry.animations.length; i++) {
            // console.log(geometry.animations[i].name);
            animations.push(geometry.animations[i].name)
        }
        mixer = new THREE.AnimationMixer(meshModel)
        mixer.clipAction("point").play()
        var box = new THREE.Box3().setFromObject(meshModel);
        console.log(box.getSize().y);
        console.log(animations)
        animations.forEach((el) => {

            var btn = $("<button>")
            btn.attr("id", el)
            btn.text(el)
            btn.on("click", function () {
                mixer.uncacheRoot(meshModel)
                mixer.clipAction(el).play()
            })
            $(document.body).append(btn)
            console.log(btn)
        })
        var clone = meshModel.clone();
        clones.push(clone)
    });

    var clock = new THREE.Clock();


    function render() {


        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu


        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny

        requestAnimationFrame(render);

        var delta = clock.getDelta();
        //console.log(delta) // zobacz czy widać zmieniającą się liczbę w konsoli
        if (mixer) mixer.update(delta)
        camera.updateProjectionMatrix();

        //renderer.setSize($(window).width(), $(window).width());

        // potwierdzenie w konsoli, że render się wykonuje

        //console.log($("#fov").val())

        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

        renderer.render(scene, camera);
    }

    render();
})