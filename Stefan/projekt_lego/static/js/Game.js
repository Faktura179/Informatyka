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

        var stats = new Stats();
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );
        this.stats=stats


        // var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        // orbitControl.addEventListener('change', function () {
        //     renderer.render(scene, camera)
        // });

        var dl1 = new THREE.DirectionalLight(0xffffff,0.5)
        scene.add(dl1)
        var dl2 = new THREE.DirectionalLight(0xffffff,0.8)
        dl2.position.z=0.5
        dl2.position.x=0.5
        dl2.position.y=0.5
        scene.add(dl2)
        var dl3 = new THREE.DirectionalLight(0xffffff,0.8)
        dl3.position.z=-0.5
        dl3.position.x=-0.5
        dl3.position.y=0.5
        scene.add(dl3)

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
        $(document).keydown(this.onKeyDown.bind(this))

        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        this.render();
        this.lastBlock=null
        this.colors=[0xff0000,0x00ff00,0x0000ff,0xffff00,0x00ffff,0xff00ff]
    }


    render() {
    
        requestAnimationFrame(this.render.bind(this));

        this.stats.update()

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
            var pos = intersects[ 0 ].object.parent.position.clone()
            if(intersects[0].object.parent.isGrid){    
                pos.x+=25
                pos.z+=25
                
            }else if(intersects[0].object.parent.isBlock){
                pos.y+=36
            }
            var box = new Block()
            box.position.copy(pos)
            this.scene.add(box)
            this.lastBlock=box

        }
    }
    onMouseMove( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
    onKeyDown(e){
        console.log(e.key)
        switch(e.key){
            case "a":
                this.angleH += Math.PI/180
                break;
            case "s":
                this.angleV-=Math.PI/180
                break;
            case "d":
                this.angleH-=Math.PI/180
                break;
            case "w":
                this.angleV+=Math.PI/180
                break;
            case "Escape":
                this.lastBlock.changeColor(this.colors)
                break;
            case " ":
                this.lastBlock.changeSize()
                break;
            case "r":
                this.lastBlock.rotate()
                break;
            case "ArrowRight":
                this.lastBlock.position.x+=25
                break;
            case "ArrowLeft":
                this.lastBlock.position.x-=25
                break;
            case "ArrowUp":
                this.lastBlock.position.z-=25
                break;
            case "ArrowDown":
                this.lastBlock.position.z+=25
                break;
        }
    }
}