class Ui{
    constructor(){
        var ip = prompt("Podaj adres ip serwera z którym chcesz się połączyć")
        net.connect(ip)
        this.baza=null
        this.kolekcja=null

        $("#polacz").click(function(e){
            var ip = prompt("Podaj adres ip serwera z którym chcesz się połączyć")
            net.connect(ip)
        })
        $("#add_db").click(function(e){
            if(net.ip!=null){
                var name = prompt("Podaj nazwę bazy: ")
                net.addDatabase(name)
            }
        })
        $("#del_db").click(function(e){
            if(ui.baza!=null)
                if(confirm("Czy na pewno?"))
                    net.delDatabase()
        })
        $("#add_col").click(function(e){
            if(ui.baza!=null){
                var name = prompt("Podaj nazwę bazy: ")
                net.addCollection(name)
            }
        })
        $("#del_col").click(function(e){
            if(ui.kolekcja!=null){
                if(confirm("Czy na pewno?"))
                    net.delCollection(ui.kolekcja)
            }
        })
    }

    onConnect(data){
        var dbs = data.dbs
        var ip = data.ip
        //console.log(dbs,ip)
        $("#polacz")[0].disabled=true
        if(ip!=null)
            $("#server").text(ip)
        
        $("#bazy").empty()
        dbs.forEach(el=>{
            var option = document.createElement("option")
            option.value = el.name
            option.innerText=el.name
            
            option.onclick=function(){
                ui.kolekcja=null
                ui.baza=this.value
                $("#baza").text(this.value)
                $("#kolekcja").text("")
                net.getCollections()
            }
            $("#bazy").append(option)
        })
    }
    onCollection(colls){
        $("#kolekcje").empty()
        colls.forEach(el=>{
            var option = document.createElement("option")
            option.value = el.name
            option.innerText=el.name
            
            option.onclick=function(){
                ui.kolekcja=this.value
                $("#kolekcja").text(this.value)
            }
            $("#kolekcje").append(option)
        })
    }
}