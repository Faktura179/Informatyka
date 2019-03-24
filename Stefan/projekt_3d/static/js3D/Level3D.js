class Level3D{
    constructor(scene){
        this.scene=scene
    }
    getContainer(){
        return this.container
    }
    createMap(id){
        var result
        $.ajax({url:"/load",
        data:{id:id},
        async:false,
        type:"POST",
        success:function(data){
            result=data
        },
        error:function(){
        
        }})
        console.log(result)
        var container = new THREE.Object3D()
        result.level.level.forEach(element => {
            var hex = new Hex3D(-1,element.dirOut)
            hex.position.x=Settings.hexRadius*element.x*2/Math.sqrt(3)+(Settings.hexRadius*element.x/Math.sqrt(3))
            hex.position.z=Settings.hexRadius*element.z*2 + ((element.x%2)*Settings.hexRadius)
            hex.rotation.y=Math.PI/2
            container.add(hex)
        });
        this.container=container
        this.scene.add(container)
    }

}