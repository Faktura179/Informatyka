class Visual {

    constructor() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            90,    // kąt patrzenia kamery (FOV - field of view)
            $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setClearColor(0xffffff);
        renderer.setSize($(window).width(), $(window).height());
        $("#root").append(renderer.domElement);
        camera.position.set(0, 0, 800)
        camera.lookAt(scene.position)
        this.points=[]
        

        this.scene=scene
        this.camera=camera
        this.renderer=renderer
        //this.render()
        this.animationFrame=null
        window.onresize=this.resize.bind(this)

        this.material = new THREE.LineBasicMaterial( { color : 0xff0000, linewidth: 3} );


        // var rendererStats	= new THREEx.RendererStats()
        // rendererStats.domElement.style.position	= 'absolute'
        // rendererStats.domElement.style.left	= '0px'
        // rendererStats.domElement.style.bottom	= '0px'
        // document.body.appendChild( rendererStats.domElement )
        // this.rendererStats=rendererStats
        
    }

    render() {
        this.animationFrame = requestAnimationFrame(this.render.bind(this)); // bind(this) przekazuje this do metody render
        var arr = music.getData()
        
        this.points.push(new THREE.Vector3(-810,0,0))
        for(var i =0;i<arr.length;i++){
            this.points.push(new THREE.Vector3(-800+i*50,0,0))
            this.points.push(new THREE.Vector3(-790+i*50,arr[i]*2,0))
            //this.points.push(new THREE.Vector3(-780+i*50,0,0))
            this.points.push(new THREE.Vector3(-770+i*50,-arr[i]*2,0))
            //this.points.push(new THREE.Vector3(-760+i*50,0,0))
        }
        this.points.push(new THREE.Vector3(810,0,0))

        var curve = new THREE.CatmullRomCurve3(this.points)
        var points = curve.getPoints( 1000 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        

        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, this.material );
        this.scene.add(curveObject)


        this.renderer.render(this.scene, this.camera);
        this.scene.remove(curveObject)
        curveObject.geometry.dispose()
        //curveObject.material.dispose()
        curveObject=undefined
        this.points=[]


        //this.rendererStats.update(this.renderer);
    }

    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}