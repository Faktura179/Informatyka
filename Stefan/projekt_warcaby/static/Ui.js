class UI{
    constructor(){
        this.clicks()
    }

    clicks(){
        $("#loguj").click(function(){
            net.login($("#nick").val())
        })
        $("#reset").click(function(){
            net.reset()
        })
    }
}