class Net{
    constructor(){

    }
    sendData(map){
    $.ajax({
        url:"/map",
        data:{map:map},
        type:"POST",
        success:function(data){
            console.log(data)
        },
        error:function(){
        
        }
        })
    }
}