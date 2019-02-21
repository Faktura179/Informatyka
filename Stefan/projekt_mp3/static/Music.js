class Music{
    constructor(){
        this.song=document.createElement("div")
        this.isPlaying=false       
    }

    load(){
        $("#audio")[0].load()
        $("#audio")[0].play()
        this.isPlaying=true
    }

    play(){
        $("#audio")[0].play()
        this.isPlaying=true
    }

    pause(){
        $("#audio")[0].pause()
        this.isPlaying=false
    }

}