class Ui{
    constructor(){
        this.clicks()
        net.getNumLevels()
        $("#load_number").css("display","block")
    }
    clicks(){
        $("#send").click(function(){
            level.createMap($("#num_planszy").val())
            $("#load_number").css("display","none")
        })
    }
}