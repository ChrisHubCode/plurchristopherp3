/*création d'une variable pour pouvoir cibler la class gallery*/
const gallery = document.getElementsByClassName("gallery")[0];
const gall = document.querySelector("#portfolio");

//supression contenu existant
gallery.innerHTML='';

/*récupération des données de l'API*/
fetch ("http://localhost:5678/api/works")
.then (function(res){
    if (res.ok){
        return res.json();
    }
}
)
.then (function(projects) {
    console.log(projects);
    afficherProjets(projects); 
}
)
;







//gallery.innerHTML = ''; 



/* afficher chaque projet*/

function afficherProjets(projects) {
    for (let project of projects) { 
        //création d'une balise figure
        const projectFigure = document.createElement("figure");
        //création de la balise image
        const projectImage = document.createElement("img");
        //on ajoute la source de la photo
        projectImage.src = project.imageUrl;
        //ajout de l'alt
        projectImage.alt = project.title;
        //création de la balise figcaption
        const projectFigcaption = document.createElement("figcaption");
        //on ajoute le titre de la photo
        projectFigcaption.innerText = project.title;
        //on rattache les éléments entre eux
        gall.appendChild(projectFigure);
        projectFigure.appendChild(projectImage);
        //projectFigure.appenChild(projectFigcaption);

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

//création d'une fonction qui édite automatiquement les objets
/*
function creerProjet(projects) {
    for (let i = 0; i < projects.length; i++ ) {
        arrayProjet.push (new projet(project[i].categoryId, project[i].imageUrl, project[i].title)); 
        
    }
}*/










