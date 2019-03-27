var level
var item
var light
var ui
var net
$(document).ready(function () {
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

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    $("#root").append(renderer.domElement);
    camera.position.set(0, 400, 400)
    camera.lookAt(scene.position)

    level=new Level3D(scene)
    item=new Item()
    light= new Light()
    net=new Net()
    ui= new Ui()

    //scene.add(level.getContainer())

    function render() {

        requestAnimationFrame(render);

        renderer.render(scene, camera);
    }

    render();
})