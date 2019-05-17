class Net{
    constructor(){
        this.name=null
        this.player=null
        this.interval
    }
    wait(){
        var that = this
        $.ajax({
            url:"/",
            data: {
                action: "WAIT",              
            },
            type:"POST",
            success:function(data){
                if(data.users.length==2){
                    $("#window").css("display","none")
                    if(that.player==1)
                        $("#status").text("Witaj "+ that.name + "! Grasz bialymi. Dolaczyl gracz "+data.users[1])
                    clearInterval(that.interval)

                }
            },
            error:function(){
                console.log("Error")
            }
            }) 
    }
    login(user){
        var that = this
        $.ajax({
            url:"/",
            data: {
                action: "ADD_USER",
                user: user,                
            },
            type:"POST",
            success:function(data){
                if(data.success){
                    $("#login").css("display","none")
                    $("#waiting").css("display","block")
                    that.name=user
                    that.player=data.player
                    game.setPieces()
                    if(data.player==2){
                        game.camera.position.set(0,320,-520)
                        game.camera.lookAt(0,0,0)
                        $("#status").text("Witaj "+ user + "! Grasz czarnymi")
                        $("#move").css("display","block")
                    }else{
                        $("#status").text("Witaj "+ user + "! Grasz bialymi")
                    }
                    that.interval=setInterval(that.wait.bind(that),500)
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
    move(){
        $.ajax({
            url:"/",
            data: {
                action: "MOVE",              
            },
            type:"POST",
            success:function(data){
                
            },
            error:function(){
                console.log("blad przy odbieraniu info")
            }
        }) 
    }
    moved(){
        $.ajax({
            url:"/",
            data: {
                action: "MOVED", 
                pionki:game.pionki             
            },
            type:"POST",
            success:function(data){
                
            },
            error:function(){
                console.log("blad przy ruszaniu sie")
            }
        }) 
    }
}