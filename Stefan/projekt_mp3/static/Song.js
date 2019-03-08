class Song{
    constructor(name, album, size=0){
        this.name=name
        this.album=album
        this.size=size
        this.htmlElement
    } 
    createElement(){
        var div = document.createElement("div")
        div.classList.add("song")
        var alb = document.createElement("div")
        var title = document.createElement("div")
        var weight = document.createElement("div")
        var buttons = document.createElement("div")
        var controls = document.createElement("div")
        var playlist = document.createElement("div")
        alb.innerText=this.album
        alb.classList.add("inner_song")
        title.innerText=this.name
        title.classList.add("inner_song")
        weight.innerText=" MB"
        weight.classList.add("inner_song")
        controls.classList.add("inner_song")
        controls.style.backgroundImage="url(/obrazki/pause.png)"
        controls.style.width="50px"
        controls.style.height="50px"
        controls.classList.add("play_pause")
        playlist.classList.add("add_to_playlist")
        playlist.onclick=this.addToPlaylist.bind(this)
        buttons.classList.add("btns")
        buttons.append(controls)
        buttons.append(playlist)
        div.append(alb)
        div.append(title)
        div.append(weight)
        div.append(buttons)
        this.htmlElement=div
        
        return div
    }
    click(){

    }
    mouseOver(){

    }
    mouseOut(){
        
    }
    addToPlaylist(){
        console.log(this.name,this.album)
        net.addToPlaylist(this.name,this.album)
    }
}