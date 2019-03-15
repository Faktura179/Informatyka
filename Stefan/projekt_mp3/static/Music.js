//console.log("Wczytano music")
class Music{
    constructor(){
        this.song=document.createElement("div") //element po to zeby nie bylo pustej referncji
        this.isPlaying=false  
        this.songs=[]
        this.currentSong=0  
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
    playNext(){
        if(this.currentSong+1<this.songs.length){
            $(this.song.parentElement.childNodes[this.currentSong+1]).click();
        }
    }
    playPrevious(){
        if(this.currentSong-1>=0){
            $(this.song.parentElement.childNodes[this.currentSong-1]).click();
        }
    }
    getData(){

    }
    
}