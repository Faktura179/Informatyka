console.log("wczytano plik Net.js")



class Net {
    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
        this.sendData(0) // wywołanie funkcji z tej samej klasy
    }

    doSth() {
        console.log("funcja doSth " + this.a + " - " + this.b)
    }

    sendData(album) {
        // tutaj wysłanie danych ajaxem na serwer
        $.ajax({
            url: "",
            data: { album:album },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)
        
                alert(JSON.stringify(obj))
        
                //tu wypisz sumę w div-ie na stronie
        
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}