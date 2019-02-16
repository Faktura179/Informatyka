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
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $("#root").append( renderer.domElement );
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.position.set(10,600,10)
    camera.lookAt(scene.position)

    var geometry = new THREE.BoxGeometry(100, 100, 100);

    var materials = [];

    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/a.jpg'),specular: 0xffffff,shininess: 50, }));
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/a.jpg'),specular: 0xffffff,shininess: 50, }));
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/c.jpg') ,specular: 0xffffff,shininess: 50}));
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/b.jpg') ,specular: 0xffffff,shininess: 50}));
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/a.jpg'),specular: 0xffffff,shininess: 50, }));
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/a.jpg'),specular: 0xffffff,shininess: 50, }));
    
    var cube = new THREE.Mesh(geometry, materials);
    var cube2 = new THREE.Mesh(geometry,materials);
    cube.position.y=100
    cube.castShadow = true
    cube2.castShadow = true
    scene.add(cube);
    

    var geometry = new THREE.PlaneGeometry( 1400, 1400 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide,specular: 0xffffff,shininess: 50} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x=Math.PI/2
    plane.receiveShadow = true
    scene.add( plane );
    

    var light = new THREE.SpotLight(0xffffff, 3, 500, 3.14/6);
    light.position.set(150, 150, 150);
    light.lookAt(cube.position);
    light.castShadow = true
    //scene.add(light);
    class Controls{
        constructor(){
            this.height=200
            this.distance=100
            this.color=0xffffff
            this.shadow=false
            this.html = $("<div>")
            var colors = $("<div>")
            for(var i=0;i<6;i++){
                var color = $("<span>")
                color.width("20px")
                color.height("20px")
                switch(i){
                    case 0:
                        color.css("background-color","red")
                        color.click(function(){
                            this.color=0xff0000
                        }.bind(this))
                    break;
                    case 1:
                        color.css("background-color","green")
                        color.click(function(){
                            this.color=0x00ff00
                        }.bind(this))
                    break;
                    case 2:
                        color.css("background-color","blue")
                        color.click(function(){
                            this.color=0x0000ff
                        }.bind(this))
                    break;
                    case 3:
                        color.css("background-color","rgb(255,255,0)")
                        color.click(function(){
                            this.color=0xffff00
                        }.bind(this))
                    break;
                    case 4:
                        color.css("background-color","rgb(0,255,255)")
                        color.click(function(){
                            this.color=0x00ffff
                        }.bind(this))
                    break;
                    case 5:
                        color.css("background-color","white")
                        color.click(function(){
                            this.color=0xffffff
                        }.bind(this))
                    break;
                }
                colors.append(color)
            }
            this.html.append(colors)
            var checkbox = $("<input type='checkbox'>")
            checkbox.change(function(){
                this.shadow=!this.shadow
            }.bind(this))
            this.html.append(checkbox)
            var height = $("<input type='range' value='200' min='100' max='1000'>")
            var distance = $("<input type='range' value='100' min='50' max='200'>")
            height.on("input",function(e){
                this.height = $(e.target).val()
            }.bind(this))
            distance.on("input",function(e){
                this.distance = $(e.target).val()
            }.bind(this))
            this.html.append(height)
            this.html.append(distance)
            this.html.addClass("controls")
        }
        getHtml(){
            return this.html
        }
    }

    class Light {

        constructor(scene, position,color) {
    
        // parametry konstruktora przekazane podczas
        // tworzenia obiektu klasy Light
        // np scena
            this.color=color
            this.scene = scene
            this.position = position 
            this.controls = new Controls()
            $("#controls").append(this.controls.getHtml())
        //dodatkowe zmienne tworzone w konstruktorze
        //widoczne w dalszych funkcjach
        //...
            this.cube = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial({color:0x00ffff,side:THREE.DoubleSide}))
    
            //kontener na inne obiekty 3D
            this.container = new THREE.Object3D();
    
            //wywołanie funkcji init()
            this.init()
        }
    
        init() {
            
            // utworzenie i spozycjonowanie światła
            this.light = new THREE.SpotLight(this.color, 3, 800, Math.PI / 10);
            this.light.position.set(0, 0, 0);
            this.light.lookAt(scene.position)
            this.light.castShadow=false
    
        // dodanie światła do kontenera
            this.container.add(this.light);
    
        // nakierowanie na środek sceny
        //...
    
            //utworzenie widzialnego elementu reprezentującego światło
            //this.mesh = new THREE.Mesh(...)

            this.container.add(this.cube)
            // dodanie do kontenera
            
            this.container.position.copy(this.position)
            this.controls.getHtml().click(function(){
                $(this).change()
            })
            this.controls.getHtml().on("input",function(){
                $(this).change()
            })
            this.controls.getHtml().change(function(){
                this.changeColor(this.controls.color)
                this.light.castShadow=this.controls.shadow
                this.container.position.x=this.position.x*(this.controls.distance/100)
                this.container.position.z=this.position.z*(this.controls.distance/100)
                this.container.position.y=this.controls.height
            }.bind(this))
        }
    
    
        // funkcja zwracająca obiekt kontenera
        // czyli nasze światło wraz z bryłą
    
        getLight() {
            return this.container;
        }
    
        // inne funkcje, np zmiana koloru bryły, zmiana koloru światła
    
        changeColor (color) {
            this.color=color
            this.light.color.setHex(this.color)
        }   
    
    }
    cube2.position.set(-100,200,-100)
    scene.add(cube2)
    var light1 = new Light(scene,new THREE.Vector3(-300,100,300),0xffffff)
    light1.changeColor(0xff0000)
    
    
    
    scene.add(light1.getLight())
    var num=0
    $("#btn").on("click",function(){
        var vec
        switch(num){
            case 0:
            vec=new THREE.Vector3(300,200,300)
            break;
            case 1:
            vec=new THREE.Vector3(-300,200,300)
            break;
            case 2:
            vec=new THREE.Vector3(-300,200,-300)
            break;
            case 3:
            vec=new THREE.Vector3(300,200,-300)
            num=-1
            break;
        }
        num++
        var light2= new Light(scene,vec,0xffffff)
        scene.add(light2.getLight())
    })


    function render() {


        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu

    
        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
    
        requestAnimationFrame(render);

        cube.rotation.z+=0.01

        camera.updateProjectionMatrix();

        //renderer.setSize($(window).width(), $(window).width());
    
        // potwierdzenie w konsoli, że render się wykonuje
    
        //console.log($("#fov").val())
        
        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
            
        renderer.render(scene, camera);
    }

    render();
})