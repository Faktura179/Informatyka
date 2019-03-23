class WhiteTile{
    constructor(){
        var geometry = new THREE.BoxGeometry(100, 40, 100);
        var materials = [];
        for(var i=0;i<6;i++)materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('img/white_tile2.jpg') }));
        var cube = new THREE.Mesh(geometry, materials);
        return cube
    }
}
class BlackTile{
    constructor(){
        var geometry = new THREE.BoxGeometry(100, 40, 100);
        var materials = [];
        for(var i=0;i<6;i++)materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('img/black_tile2.jpg') }));
        var cube = new THREE.Mesh(geometry, materials);
        return cube
    }
}
class WhitePiece{
    constructor(){
        var geometry = new THREE.CylinderGeometry(40,40,20,40)
        var mesh = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color:0xffffff})
        var cylinder = new THREE.Mesh(geometry, mesh)
        return cylinder
    }
}
class BlackPiece{
    constructor(){
        var geometry = new THREE.CylinderGeometry(40,40,20,40)
        var mesh = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color:0xff0000})
        var cylinder = new THREE.Mesh(geometry, mesh)
        return cylinder
    }
}
class Game{
    constructor(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            90,    // kąt patrzenia kamery (FOV - field of view)
            $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setClearColor(0x000000);
        renderer.setSize($(window).width(), $(window).height());
        $("#root").append(renderer.domElement);
        camera.position.set(0, 320, 520)
        camera.lookAt(scene.position)
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)

        this.scene=scene
        this.camera=camera
        this.renderer=renderer

        this.render()
        window.onresize=this.resize.bind(this)


        this.szachownica=[
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
        ]
        this.pionki=[
            [0,2,0,2,0,2,0,2],
            [2,0,2,0,2,0,2,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0]
        ]


        //Generuj plansze
        var blackTile = new BlackTile()
        var whiteTile = new WhiteTile()
        for(var i =0;i<this.szachownica.length;i++){
            for(var j=0;j<this.szachownica[i].length;j++){
                var cube
                if(this.szachownica[i][j]==0){
                    cube =blackTile.clone()
                }else{
                    cube =whiteTile.clone()
                }
                cube.position.x=-350+j*100
                cube.position.z=-350+i*100
                scene.add(cube)
            }
        }
        
    }

    render() {
        this.animationFrame = requestAnimationFrame(this.render.bind(this));

        

        this.renderer.render(this.scene, this.camera);
    }
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    setPieces(){
        var whitePiece = new WhitePiece()
        var blackPiece = new BlackPiece()
        for(var i =0;i<this.pionki.length;i++){
            for(var j=0;j<this.pionki[i].length;j++){
                var piece
                if(this.pionki[i][j]==1){
                    piece = whitePiece.clone()
                }else if(this.pionki[i][j]==2){
                    piece = blackPiece.clone()
                }else{
                    continue
                }
                piece.position.x=-350+j*100
                piece.position.z=-350+i*100
                piece.position.y=20
                this.scene.add(piece)
            }
        }
    }
}