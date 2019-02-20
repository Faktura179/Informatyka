console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        this.clicks()
    }

    //obsługa kliknięć w Ui

    clicks() {

        $("#albums").click(function () {
            net.sendData()
        })

    }

    albums(albums){
        console.log(albums)
        var container = document.getElementById("albums")
        albums.forEach(el => {
            var div = document.createElement("div")
            div.classList.add("covers")
            div.innerText=el
            var img = document.createElement("img")
            img.src="/"+el
            img.classList.add("img")
            div.append(img)
            container.append(div)
        });
    }

    songs(songs){
        console.log(songs)
        var container = document.getElementById("songs")
        songs.forEach(el=>{
            var div = document.createElement("div")
            div.classList.add("song")
            div.innerText=el
            container.append(div)
        })
    }

}
