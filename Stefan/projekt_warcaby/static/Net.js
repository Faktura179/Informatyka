class Net{
    constructor(){
        this.name=null
        this.player=null
    }

    login(user){
        $.ajax({
            url:"/",
            data: {
                action: "ADD_USER",
                user: user,                
            },
            type:"POST",
            success:function(data){
                console.log(data)
                if(data.success){
                    $("#window").css("display","none")
                    this.name=user
                    this.player=data.player
                    game.setPieces()
                    if(data.player==2){
                        game.camera.position.set(0,320,-520)
                        game.camera.lookAt(0,0,0)
                    }
                }else{
                    $("#status").text(data.error)
                }
            },
            error:function(){
                console.log("Error")
            }
            }) 
    }
    reset(){
        $.ajax({
            url:"/",
            data: {
                action: "RESET",              
            },
            type:"POST",
            success:function(data){
                console.log("zresetowany")
            },
            error:function(){
                console.log("Error")
            }
            }) 
    }
}