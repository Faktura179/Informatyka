class UI{
    constructor(){
        $("#add").click(function(e){
            var login = $("#login").val()
            var pass = $("#passwd").val()
            $.ajax({
                url:"/add",
                data: {
                        login:login,
                        password:pass           
                },
                type:"POST",
                success:function(data){
                    //console.log(data)
                },
                error:function(){
                }
            })
        })
        $("#get").click(function(e){
            $.ajax({
                url:"/get",
                data: {
                                 
                },
                type:"POST",
                success:function(data){
                    //console.log(data)
                    $("#collection").val(JSON.stringify(data))
                    $("#id").empty()
                    data.forEach(el => {
                        var option = $("<option>")
                        option.val(el._id)
                        option.text(el._id)
                        $("#id").append(option)
                    });
                },
                error:function (request, status, error) {
                    console.log(status,error)
                }
            })
        })
        $("#update").click(function(e){
            $.ajax({
                url:"/update",
                data: {
                    _id:$("#id").val(),
                    password:  $("#passwd").val()         
                },
                type:"POST",
                success:function(data){
                    console.log(data)
                },
                error:function(){
                }
            })
        })
    }
}