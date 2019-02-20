//console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
       // console.log("konstruktor klasy Ui")
        this.clicks()
    }

    //obsługa kliknięć w Ui

    clicks() {

        $("#albums").click(function (e) {
            var children = $(e.currentTarget).children()
            children.each(function(index, element){
                if(element.isSameNode(e.target)){
                    net.sendData(index);
                }
            })
        })

    }

    albums(albums){
        var container = document.getElementById("albums")
        albums.forEach(el => {
            var img = document.createElement("img")
            img.src="/"+el
            img.classList.add("img")
            container.append(img)
        });
    }

    songs(songs,album){
        console.log(songs)
        var container = document.getElementById("songs")
        $(container).empty()
        songs.forEach(el=>{
            var div = document.createElement("div")
            div.classList.add("song")
            div.innerText=album +"/" +el 
            container.append(div)
        })
    }

}
