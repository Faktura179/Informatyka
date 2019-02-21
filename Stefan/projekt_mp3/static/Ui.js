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
            img.src="/mp3/"+el+"/Cover.jpg"
            img.classList.add("img")
            container.append(img)
        });
    }

    songClick(){
        $(".song").toArray().forEach((el)=>{
            $(el).on("mouseover",function(e){
                this.style.backgroundColor="blue"
            })
            $(el).on("mouseout",function(e){
                if(!music.song.isSameNode(this))
                    this.style.backgroundColor="white"
            })
            $(el).on("click",function(e){
                $("#audio_src")[0].src="/mp3/"+this.childNodes[0].innerText+"/"+this.childNodes[1].innerText
                music.load()
                music.song.style.backgroundColor="white"
                music.song=this
                this.style.backgroundColor="blue"
                this.childNodes[3].style.display="block"
            })
        })
        $(".play_pause").toArray().forEach((el)=>{
            $(el).on("click",function(e){
                e.stopPropagation()
                console.log(music.isPlaying)
                if(music.isPlaying){
                    music.pause()
                }else{
                    music.play()
                }
            })
        })    
    }

    songs(songs,album){
        var container = document.getElementById("songs")
        $(container).empty()
        songs.forEach(el=>{
            var div = document.createElement("div")
            div.classList.add("song")
            var alb = document.createElement("div")
            var title = document.createElement("div")
            var weight = document.createElement("div")
            var controls = document.createElement("div")
            alb.innerText=album
            alb.classList.add("inner_song")
            title.innerText=el
            title.classList.add("inner_song")
            weight.innerText=" MB"
            weight.classList.add("inner_song")
            controls.classList.add("inner_song")
            controls.style.background="grey"
            controls.style.width="50px"
            controls.style.height="100px"
            controls.style.border="1px solid red"
            controls.classList.add("play_pause")
            div.append(alb)
            div.append(title)
            div.append(weight)
            div.append(controls)
            container.append(div)
        })
        this.songClick()
    }

}
