window.onload=function(){
    getTab()

}

function getTab(){
    var xhttp = new XMLHttpRequest()
    xhttp.open("POST", "/server.php",true)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
}