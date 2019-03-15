class Visual {

    constructor() {
        this.render()
    }

    render() {
        requestAnimationFrame(this.render.bind(this)); // bind(this) przekazuje this do metody render
        $("#anydiv").html(music.getData()) // wyświetlenie danych audio w div-ie
    }

}