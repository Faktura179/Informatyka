var level
var item
var light
var ui
var net
var player
var allies=[]

var clickedVect = new THREE.Vector3(0,0,0); // wektor określający PUNKT kliknięcia
var directionVect = new THREE.Vector3(0,0,0); // wektor określający KIERUNEK ruchu playera
var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
var clock = new THREE.Clock();
var raycasterC = new THREE.Raycaster();
var geometry = new THREE.SphereGeometry( 10, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var kulka = new THREE.Mesh( geometry, material );


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

    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap5;

    // var orbitControl = new THREE.OrbitControls(ca5mera, renderer.domElement);
    // orbitControl.addEventListener('change', funct5ion () {
    //     renderer.render(scene, camera)
    // });
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
    player = new Player()
    allies.push(new Ally())
    allies.push(new Ally())

    $("canvas").mousedown(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera( mouseVector, camera );
        var arr=[]
        level.container.children.forEach(element => {
            element.children.forEach(el=>{
                if(el.isFloor==true) arr.push(el)
            })
        });
        var intersects = raycaster.intersectObjects( arr.concat(allies), true );
        //console.log(arr)
        if(intersects.length>0){
            if(intersects[0].object.isFloor == true){
                clickedVect = intersects[0].point
                directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
                //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
                //jest to wymagane przez kolejne funkcje	
                var angle = Math.atan2(
                    player.getPlayerCont().position.clone().x - clickedVect.x,
                    player.getPlayerCont().position.clone().z - clickedVect.z
                )
                player.getPlayerMesh().rotation.y = angle
            }
            else{
                var obj = intersects[0].object.parent.parent
                obj.isMoving=!obj.isMoving
                obj.model.stopAnimation()
            }
        }
    })
    $("canvas").mousemove(function(event){
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
    })
    scene.add(kulka)
    function render() {

        requestAnimationFrame(render);
        var delta = clock.getDelta();
        directionVect.y=0
        clickedVect.y=0
        var speed=Settings.hexRadius/100*3

        var followers=0
        allies.forEach((el,index)=>{
            el.model.updateModel(delta)
            if(el.isMoving)
                el.move(player.getPlayerCont().position.clone(),speed,followers++)
            el.ring.visible=false;
        })
        raycaster.setFromCamera( mouseVector, camera );
        var intersects = raycaster.intersectObjects( allies,true );
        if(intersects.length>0){
            intersects[0].object.parent.parent.ring.visible=true
        }


        var ray = new THREE.Ray(player.getPlayerCont().position, player.getPlayerMesh().getWorldDirection(new THREE.Vector3(1,1,1)))
        raycasterC.ray = ray
        var intersects = raycasterC.intersectObject(level.getContainer(), true); 
        if (intersects[0]) {  
            // console.log(intersects[0].distance) // odległość od vertex-a na wprost, zgodnie z kierunkiem ruchu
            // console.log(intersects[0].point) // współrzędne vertexa na wprost
            if(intersects[0].distance<50){
                clickedVect=player.getPlayerCont().position
            }
            kulka.position.x=intersects[0].point.x
            kulka.position.y=intersects[0].point.y
            kulka.position.z=intersects[0].point.z
        }



        player.model.updateModel(delta)
        player.move(directionVect,clickedVect,speed)
                
        camera.position.x = player.getPlayerCont().position.x
        camera.position.z = player.getPlayerCont().position.z + Settings.hexRadius
        camera.position.y = player.getPlayerCont().position.y + Settings.hexRadius
        camera.lookAt(player.getPlayerCont().position)
        
        renderer.render(scene, camera);
    }

    render();
})