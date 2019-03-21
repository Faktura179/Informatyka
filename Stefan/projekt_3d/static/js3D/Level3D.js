class Level3D{
    constructor(scene){
        var result
        $.ajax({url:"/load",
        data:{id:0},
        type:"POST",
        async:false,
        success:function(data){
            result=data
        },
        error:function(){
        
        }})
        
    }


}