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

    level=new Level3D(scene)
    item=new Item()
    light= new Light()
    net=new Net()
    ui= new Ui()
    player = new Player()
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
        var intersects = raycaster.intersectObjects( arr, true );
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
        }
    })
    $("canvas").mousemove(function(event){
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
    })

    function render() {

        requestAnimationFrame(render);
        var delta = clock.getDelta();
        directionVect.y=0
        clickedVect.y=0
        var speed=Settings.hexRadius/100*3


        allies.forEach((el,index)=>{
            el.model.updateModel(delta)
            el.move(clickedVect,directionVect,speed,index)
            el.ring.visible=false;
        })
        raycaster.setFromCamera( mouseVector, camera );
        var intersects = raycaster.intersectObjects( allies,true );
        if(intersects.length>0){
            intersects[0].object.parent.parent.ring.visible=true
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