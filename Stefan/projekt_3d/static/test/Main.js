var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var clickedVect = new THREE.Vector3(0,0,0); // wektor określający PUNKT kliknięcia
var directionVect = new THREE.Vector3(0,0,0); // wektor określający KIERUNEK ruchu playera
var player
var sphere
var mousedown=false
var clock = new THREE.Clock();


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

    // var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControl.addEventListener('change', function () {
    //     renderer.render(scene, camera)
    // });
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    $("#root").append(renderer.domElement);
    camera.position.set(0, 400, 400)
    camera.lookAt(scene.position)
    var floor=new Plane()
    scene.add(floor.getContainer())
    player= new Player()
    scene.add(player.getPlayerCont())
    var geometry = new THREE.SphereGeometry( 15, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true, transparent:true} );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    //scene.add(level.getContainer())

    function render() {
        
        requestAnimationFrame(render);
        var delta = clock.getDelta();
        
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( floor.container.children, true );
        if (intersects.length > 0) {
            if(mousedown){
                clickedVect = intersects[0].point
                directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
                //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
                //jest to wymagane przez kolejne funkcje	
                var angle = Math.atan2(
                    player.getPlayerCont().position.clone().x - clickedVect.x,
                    player.getPlayerCont().position.clone().z - clickedVect.z
                )
                player.getPlayerMesh().rotation.y = angle
                player.getAxes().rotation.y=angle
                sphere.position.set(clickedVect.x,5,clickedVect.z)
            }
        }
        
        player.player.updateModel(delta)

        directionVect.y=0
        if(player.getPlayerCont().position.clone().distanceTo(clickedVect)>51){
            
            player.getPlayerCont().translateOnAxis(directionVect, 5)
            player.player.setAnimation()
        }else{
            player.getPlayerCont().translateOnAxis(directionVect, 0)
            player.player.stopAnimation()
        }
                
        camera.position.x = player.getPlayerCont().position.x
        camera.position.z = player.getPlayerCont().position.z + 400
        camera.position.y = player.getPlayerCont().position.y + 400
        camera.lookAt(player.getPlayerCont().position)
        
        renderer.render(scene, camera);
    }
    $(document).mousedown(function (event) {
        mousedown=true
    })
    $(document).on("mousemove",function(event){
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
    })
    $(document).mouseup(function(){
        mousedown=false
    })
    render();
})