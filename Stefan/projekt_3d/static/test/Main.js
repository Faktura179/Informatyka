var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var clickedVect = new THREE.Vector3(0,0,0); // wektor określający PUNKT kliknięcia
var directionVect = new THREE.Vector3(0,0,0); // wektor określający KIERUNEK ruchu playera
var player


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
    var floor=new Plane()
    scene.add(floor.getContainer())
    player= new Player()
    scene.add(player.getPlayerCont())

    //scene.add(level.getContainer())

    function render() {
        
        requestAnimationFrame(render);
            
        player.getPlayerCont().translateOnAxis(directionVect, 5)
        
        renderer.render(scene, camera);
    }
    $(document).mousedown(function (event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( scene.children, true );
        if (intersects.length > 0) {
            clickedVect = intersects[0].point
            console.log(clickedVect)
            directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
            console.log(directionVect)
            //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
            //jest to wymagane przez kolejne funkcje	
            console.log(player.getPlayerCont().position.clone().distanceTo(clickedVect))
            }
    
    })
    render();
})