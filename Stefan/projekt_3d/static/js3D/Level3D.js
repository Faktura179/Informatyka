class Level3D{
    constructor(scene){
        this.scene=scene
        this.lights=[]
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
        //console.log(result)
        var container = new THREE.Object3D()
        result.level.level.forEach(element => {
            var arr = element.dirIn || []
           // console.log(element.dirIn)
            arr.push(element.dirOut)
            var hex = new Hex3D(arr)
            hex.position.x=Settings.hexRadius*element.x*2/Math.sqrt(3)+(Settings.hexRadius*element.x/Math.sqrt(3))
            hex.position.z=Settings.hexRadius*element.z*2 + ((element.x%2)*Settings.hexRadius)
            hex.rotation.y=Math.PI/2
            switch(element.type){
                case "treasure":
                    hex.add(new Item())
                    break;
                case "light":
                    var light =new Light()
                    this.lights.push(light)
                    hex.add(light)
                    break;
            }
            container.add(hex)
        });
        this.container=container
        this.scene.add(container)
        this.scene.add(player.getPlayerCont())
    }

}