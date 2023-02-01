/*récupération des données de l'API*/
const call = fetch ("http://localhost:5678/api/works")
.then (function(res){
    if (res.ok){
        return res.json();
    }
}
)
.then (function(value) {
    console.log(value); /*affichage des données dans la console*/
}
)
.then(function(value) {
    getElementByClassName("gallery")
    innerText = value.category; /*test pour afficher des données*/
}
)
;




/*création d'une variable pour pouvoir cibler la class gallery*/
let gallery = document.getElementsByClassName("gallery");

/*effacer le contenu de la class gallery*/

gallery.innerHTML = ''; /*ne fonctionne pas*/

document.querySelector(".gallery").innerHTML = ''; /*fonctionne*/

/* afficher chaque projet*/

function afficherProjets(project) {
    for (let i= 0; i < projects.length; i++) {
        //création d'une balise figure
        const projectFigure = gallery.createElement("figure");
        //création de la balise image
        const projectImage = gallery.createElement("img");
        //on ajoute la source de la photo
        projectImage.src = projects[i].imageUrl;
        //ajout de l'alt
        projectImage.alt = projects[i].title;
        //création de la balise figcaption
        const projectFigcaption = gallery.createElement("figcaption");
        //on ajoute le titre de la photo
        projectFigcaption.innerText = projects[i].title;
        //on rattache les éléments entre eux
        projectImage.appenChild(projectFigure);
        projectFigcaption.appenChild(projectFigure);

    }
}

//création d'une classe projet

class projet {
    constructor(group, photo, legend) {
        this.group = group;
        this.photo = photo;
        this.legend = legend;
    }
}

//création d'une fonction qui édite automatiquement les classes

function creerProjet(project) {
    for (let i = 0; i < projects.length; i++ ) {
        let projetNumero = new projet(project[i].categoryId, project[i].imageUrl, project[i].title); 
    }
}