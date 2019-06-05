class Net{
    constructor(){
        this.ip=null
    }
    connect(ip){
        $.ajax({url:"/connect",
            data: {
                ip:ip            
            },
            type:"POST",
            success:function(data){
                //console.log(data)
                net.ip = data.ip
                ui.onConnect(data)
            },
            error:function(){
                if(confirm("Łączyć z localhostem?")){
                    $.ajax({url:"/connect",
                    data: {
                        ip:"127.0.0.1"            
                    },
                    type:"POST",
                    success:function(data){
                        //console.log(data)
                        net.ip = data.ip
                        ui.onConnect(data)
                    },
                    error:function(){
                        alert("Nie udało się połączyć z serwerem Mongo.")
                    }
                    })
                }
            }
        })
    }
    getCollections(){
        $.ajax({url:"/collections",
            data: {
                ip:net.ip,
                db:ui.baza    
            },
            type:"POST",
            success:function(data){
                // /console.log(data.collections)
                ui.onCollection(data.collections)
            },
            error:function(){

            }
        })
    }
    addDatabase(name){
        $.ajax({url:"/add_db",
            data: {
                ip:net.ip,
                db:name
            },
            type:"POST",
            success:function(data){
                ui.onConnect(data)
            },
            error:function(){

            }
        })
    }
    delDatabase(){
        $.ajax({url:"/del_db",
        data: {
        },
        type:"POST",
        success:function(data){
            ui.onConnect(data)
            $("#baza").text("")
            $("#kolekcja").text("")
            ui.baza=null
            ui.kolekcja=null
            $("#kolekcje").empty()
        },
        error:function(){

        }
    })
    }
    addCollection(name){
        $.ajax({url:"/add_col",
            data: {
                col:name
            },
            type:"POST",
            success:function(data){
                ui.onCollection(data.collections)
            },
            error:function(){
                
            }
        })
    }
    delCollection(name){
        $.ajax({url:"/del_col",
            data: {
                col:name
            },
            type:"POST",
            success:function(data){
                ui.kolekcja=null
                $("#kolekcja").text("")
                ui.onCollection(data.collections)
            },
            error:function(){
                
            }
        })
    }
}