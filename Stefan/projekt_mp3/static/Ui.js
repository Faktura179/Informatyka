//console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
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
        $("#prev").on("click",function(){
            music.playPrevious()
        })
        $("#next").on("click",function(){
            music.playNext()
        })
        $("#audio").on("timeupdate",function(){
            //console.log($("#audio").prop("currentTime"),$("#audio").prop("duration"))
            var currTime=Math.floor(Math.floor( $("#audio").prop("currentTime"))/60)+":"+(Math.floor( $("#audio").prop("currentTime"))%60)
            var durr=Math.floor(Math.floor($("#audio").prop("duration"))/60)+":"+(Math.floor( $("#audio").prop("duration"))%60)
            var percent = ($("#audio").prop("currentTime")/$("#audio").prop("duration"))*100
            //console.log(percent)
            $("#progress").css("width",percent*2)
            $("#time").text(currTime+"/"+durr)
        })
        $("#playlist").click(function(e){
            net.getPlaylist()
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
        $(".song").toArray().forEach((el,index)=>{
            let i = index
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
                if(music.song.childNodes.length>3)
                    music.song.childNodes[3].style.display="none"
                music.song=this
                music.currentSong=i
                console.log(music.currentSong, music.songs.length)
                $("#info").text(this.childNodes[0].innerText+"/ "+this.childNodes[1].innerText);
                this.style.backgroundColor="blue"
                this.childNodes[3].style.display="inline-flex"
                $(".play_pause").toArray().forEach((el)=>{
                    el.style.backgroundImage="url(/obrazki/pause.png)"
                })
            })
        })
        $(".play_pause").toArray().forEach((el)=>{
            $(el).off("click")
            $(el).on("click",function(e){
                e.stopPropagation()
                console.log(music.isPlaying)
                if(music.isPlaying){
                    music.pause()
                    $(".play_pause").toArray().forEach((el)=>{
                        el.style.backgroundImage="url(/obrazki/play.png)"
                    })
                    
                }else{
                    music.play()
                    $(".play_pause").toArray().forEach((el)=>{
                        el.style.backgroundImage="url(/obrazki/pause.png)"
                    })
                }
            })
        })
    }

    songs(songs,album){
        var container = document.getElementById("songs")
        $(container).empty()
        music.songs=[]
        songs.forEach(el=>{
            var song = new Song(el,album)
            music.songs.push(song)
            container.append(song.createElement())
        })
        this.songClick()
    }
    playlist(items){
        var container = document.getElementById("songs")
        $(container).empty()
        music.songs=[]
        items.forEach(el=>{
            var song = new Song(el.song,el.album)
            music.songs.push(song)
            container.append(song.createElement())
        })
        this.songClick()
    }

}
