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
        var controls = document.createElement("div")
        alb.innerText=this.album
        alb.classList.add("inner_song")
        title.innerText=this.name
        title.classList.add("inner_song")
        weight.innerText=" MB"
        weight.classList.add("inner_song")
        controls.classList.add("inner_song")
        controls.style.backgroundImage="url(/obrazki/pause.png)"
        controls.style.width="50px"
        controls.style.height="100px"
        controls.style.border="1px solid red"
        controls.classList.add("play_pause")
        div.append(alb)
        div.append(title)
        div.append(weight)
        div.append(controls)
        this.htmlElement=div
        
        return div
    }
}