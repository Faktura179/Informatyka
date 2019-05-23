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
         
         camera.position.set(1000,1000,1000)
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize($(window).width(), $(window).height());
        
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        $("#root").append(renderer.domElement);



        function render() {
    
            requestAnimationFrame(render);
    
            renderer.render(scene, camera);
        }
    
        render();
    }
}