$(document).ready(function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        90,    // kąt patrzenia kamery (FOV - field of view)
        $(window).width()/$(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery 
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize($(window).width(), $(window).height());
    $("#root").append( renderer.domElement );
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.position.set(200,200,200)
    camera.lookAt(scene.position)
    var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial({ 
        side: THREE.DoubleSide, 
        map: new THREE.TextureLoader().load('tekstura.png') ,
        transparent: true, 
        opacity: 0.8,
        
        })
    var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh)
    var angle = 1
    var move=false;
    var button=-1
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D

    $(document).mousedown(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children);
   
        console.log(intersects.length)
        if (intersects.length > 0) {

            //zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
    
            console.log(intersects[0].object); 
          
    }
    

    })
    



    $(document).keydown(function(e){
        // console.log(e.which) 
        // if(e.which==65)
        // camera.position.x+=0.01
        // if(e.which==68)
        // camera.position.x-=0.01
        // if(e.which==83){
        // camera.position.y -=0.01   }   
        // if(e.which==87){
        //     camera.position.y += 0.01     } 
        // if(e.which==81)
        // camera.position.z+=0.01
        // if(e.which==69)
        // camera.position.z-=0.01
        // if(e.which==82){
        //     camera.position.z=(100 * Math.cos(angle))  
        //     camera.position.x=(100 * Math.sin(angle))
        //     angle+=0.01 
        // }
        
        // camera.lookAt(scene.position)
        move=true
        button=e.which
     })
     $(document).keyup(function(e){
         move=false
     })

    function render() {

        if(move){
            if(button==65)
            camera.position.x+=1
            if(button==68)
            camera.position.x-=1
            if(button==83){
            camera.position.y -=1   }   
            if(button==87){
                camera.position.y += 1     } 
            if(button==81)
            camera.position.z+=1
            if(button==69)
            camera.position.z-=1
            if(button==82){
                camera.position.z=(100 * Math.cos(angle))  
                camera.position.x=(100 * Math.sin(angle))
                angle+=0.01 
            }
            camera.lookAt(scene.position)
        }
         
        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu
    
        //mesh.rotation.y += 0.01
    
        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
    
        requestAnimationFrame(render);

        camera.updateProjectionMatrix();

        //renderer.setSize($(window).width(), $(window).width());
    
        // potwierdzenie w konsoli, że render się wykonuje
    
        //console.log($("#fov").val())
        
        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
            
        renderer.render(scene, camera);
    }

    render();

})