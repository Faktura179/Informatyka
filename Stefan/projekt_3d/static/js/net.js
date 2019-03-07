class Net{
    constructor(){

    }
    sendData(size,map){
    $.ajax({
        url:"/map",
        data:{size:size,level:map},
        type:"POST",
        success:function(data){
            $("#json_pre").text(JSON.stringify(data,null,4))
        },
        error:function(){
        
        }
        })
    }
    getLevel(id){
        $.ajax({
            url:"/load",
            data:{id:id},
            type:"POST",
            success:function(data){
                $("#sel").val(data.level.size)
                type="wall"
                $("#sel").trigger("change")
                data.level.level.forEach(element => {
                    var hex =field[element.z][element.x]
                    hex.dir=element.dirOut
                    hex.type=element.type
                    hex.inside()
                    
                });
            },
            error:function(){
            
            }
            }) 
    }
}