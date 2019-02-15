
$(document).ready(function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        4/3,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery 
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize($(window).width(), $(window).width());
    $("#root").append( renderer.domElement );
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.position.set(200,200,200)
    camera.lookAt(scene.position)
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
                    color: 0x8888ff,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true, 
                    opacity: 0.5
                });
    var cube = new THREE.Mesh(geometry, material);
    

    camera.fov = 100;
    camera.updateProjectionMatrix();

    var geometry1 = new THREE.SphereGeometry( 20, 32, 32 );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true, 
        opacity: 0.5} );
    var sphere = new THREE.Mesh( geometry1, material1 );
    //scene.add( sphere );

    var geometry2 = new THREE.ConeGeometry( 50, 20, 32 );
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true, 
        opacity: 0.5} );
    var cone = new THREE.Mesh( geometry2, material2);
    //scene.add( cone );

    var geometry3 = new THREE.IcosahedronGeometry(50)
    var material3 = new THREE.MeshBasicMaterial( {color: 0x00ffff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true, 
        opacity: 0.5} );
    var icohedron = new THREE.Mesh(geometry3, material3)

    $("#cube").on("click",function(){
        scene.add(cube);
    })
    $("#sphere").on("click",function(){
        scene.add(sphere);
    })
    $("#cone").on("click",function(){
        scene.add(cone);
    })
    $("#icohedron").on("click",function(){
        scene.add(icohedron);
    })
    
    function render() {


        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu
    
        //mesh.rotation.y += 0.01;

        cube.rotation.y += 0.01;
    
        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
    
        requestAnimationFrame(render);

        camera.fov = $("#fov").val();
        camera.updateProjectionMatrix();

        //renderer.setSize($(window).width(), $(window).width());
    
        // potwierdzenie w konsoli, że render się wykonuje
    
        //console.log($("#fov").val())
        
        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
            
        renderer.render(scene, camera);
    }

    render();
})