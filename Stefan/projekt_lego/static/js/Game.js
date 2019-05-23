class Game{
    constructor(){
        var scene = new THREE.Scene();
        var camera = new THREE.OrthographicCamera(
            window.innerWidth / -2,
            window.innerWidth / 2,
            window.innerHeight / 2,
            window.innerHeight / -2,
            0, // minimalny zasięg musi być >= 0
         10000);
        //  var camera = new THREE.PerspectiveCamera(
        //     90,    // kąt patrzenia kamery (FOV - field of view)
        //     $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        //     0.1,    // minimalna renderowana odległość
        //     10000    // maxymalna renderowana odległość od kamery 
        // );
         
         camera.position.set(1000,1000,1000)
         camera.lookAt(scene.position)
         camera.updateProjectionMatrix()
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize($(window).width(), $(window).height());

        // var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        // orbitControl.addEventListener('change', function () {
        //     renderer.render(scene, camera)
        // });
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        renderer.domElement.onclick=this.onClick.bind(this)
        renderer.domElement.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        $("#root").append(renderer.domElement);
        
        for(let i =0; i<15;i++){
            for(let j = 0; j<15;j++){
                var grid = new Griditem()
                grid.position.x = i *50 -375
                grid.position.z=j*50 -375
                scene.add(grid)
            }
        }
    
        this.angleH = 1
        this.angleV = 1
        $(document).keydown(function (e){
            switch(e.key){
                case "a":
                    console.log("a")
                    game.angleH += Math.PI/180
                    break;
                case "s":
                    console.log("s")
                    game.angleV-=Math.PI/180
                    break;
                case "d":
                    console.log("d")
                    game.angleH-=Math.PI/180
                    break;
                case "w":
                    console.log("w")
                    game.angleV+=Math.PI/180
                    break;
            }
        })

        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        this.render();
    }


    render() {
    
        requestAnimationFrame(this.render.bind(this));

        var speed = Date.now() * 0.00025;
        this.camera.position.x = Math.cos(this.angleH) * 1000;
        this.camera.position.z = Math.sin(this.angleH) * 1000;
        this.camera.position.y = Math.sin(this.angleV) * 1000
        this.camera.lookAt(0,0,0)
        
        this.renderer.render(this.scene, this.camera);
    }

    onClick(event){
        this.raycaster.setFromCamera( this.mouse, this.camera );
        var intersects =this.raycaster.intersectObjects( this.scene.children, true )
        if(intersects.length>0){
            intersects[ 0 ].object.material.color.setHex(0x00ff00)
        }
    }
    onMouseMove( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
}