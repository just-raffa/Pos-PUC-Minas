function salvarNoticia() {
    var elTitulo = document.getElementsByName("titulo")[0];
    var elConteudo = document.getElementsByName("conteudo")[0];
    var elTags = document.getElementsByName("newsTags")[0];
    if (elTitulo.value != "" && elConteudo.value != "") {

        let objNoticias = JSON.parse(localStorage.getItem("noticias"));
        if (objNoticias === null || objNoticias.length == 0)
            objNoticias = new Array();

        let dataAtual = new Date();
        let noticia = new Object;
        noticia.date = dataAtual.toLocaleString();
        noticia.cod = dataAtual.getTime();
        noticia.titulo = elTitulo.value;
        noticia.conteudo = elConteudo.value;
        noticia.tags = elTags.value;
        objNoticias.push(noticia);

        localStorage.setItem("noticias", JSON.stringify(objNoticias));
        elTitulo.value = null, elConteudo.value = null, elTags.value = null;
        document.querySelector("#resultado").innerHtml = "Registro de notícia salvo com sucesso."

        window.location.href = "index.html";

    } else {
        console.error("Preencha todos os campos");
    }

};

const checkVal = (arr, val) => {
    let valExist = arr.some(value => value === val);
    return valExist;
}

function listTags() {

    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0) {
        objNoticias = [];
    }
    let finalArr = [];

    for (let noticia of objNoticias) {
        if (noticia.tags != undefined) {
            let tags = noticia.tags.split(";");
            for (let tag of tags) {
                if (!checkVal(finalArr, tag)) {
                    finalArr.push(tag);
                }
            }
        }
    }

    let el;
    for (let item of finalArr) {
        el = "<li><a onclick='filterByTag(\"" + item.trim() + "\")' href= '#'>" + item + "</a></li>";
        $("#tags").append(el);
    }
}

function listarNoticias() {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    console.log(objNoticias);
    if (objNoticias === null || objNoticias.lengt == 0){
        objNoticias = [];
    }

    for (let noticia of objNoticias) {
        let elPost = "<div class='card col-md-5'>";
        elPost += "<a href='#!'><img class='card-img-top' scr='https://dummyimage.com/700x350/dee2e6/6c757d.'></img></a>";
        elPost += "<div class='card-body'>";
        elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
        elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
        elPost += "<p class='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
        elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'>Ver mais -> </a>";
        elPost += "</div></div>";
        $("#result").append(elPost);

    }
}

function pesquisar(term) {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0){
        objNoticias = [];
    }
    var found = false;
    $("#result").empty();
    for (let noticia of objNoticias) {
        if (noticia.titulo.toLowerCase().indexOf(term) > -1 || noticia.conteudo.toLowerCase().indexOf(term) > -1){
            console.log('achou', noticia);
            let elPost = "<div class= 'card col-md-5'>";
            elPost += "<a href='#!'><img class='card-img-top' scr='https://dummyimage.com/700x350/dee2e6/6c757d.'></img></a>";
            elPost += "<div class='card-body'>";
            elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
            elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
            elPost += "<p class='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
            elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'>Ver mais -> </a>";
            elPost += "</div></div>";
            $("#result").append(elPost);
            found = true
        }else{
            console.log('nao achou', noticia);
        }
    }
    if (!found) {
        $("#result").html("Sem resultados!");
    }
}

function filterByTag(tagItem) {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0);
    objNoticias = new Array();
    var found = false;
    $("result").empty();
    for (let noticia of objNoticias) {

        if (objNoticias.tags === undefined || objNoticias.tags == null)
            continue;
        if (noticia.tags.indexOf(tagItem) > -1) {
            let elPost = "<div class= 'card col-md-5'>";
            elPost += "<a href='#!'><img class='card-img-top' scr='https://dummyimage.com/700x350/dee2e6/6c757d.'></img></a>";
            elPost += "<div class='card-body'>";
            elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
            elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
            elPost += "<p class='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
            elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'>Ver mais -> </a>";
            elPost += "</div></div>";
            $("#result").append(elPost);
            found = true;
        }
    }
    if (!found)
        $("result").html("Sem resultados!");
}
