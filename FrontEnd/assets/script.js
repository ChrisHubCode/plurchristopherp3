//déclaration des variables------------------------------------

/*création d'une variable pour pouvoir cibler la class gallery*/
const gallery = document.getElementsByClassName("gallery")[0];
const gall = document.querySelector(".gallery");
//variable pour cibler la section portfolio
const portfolio = document.querySelector("#portfolio");
//cibler l'adresse url de l'index
const index = window.location.href;
//params index
let indexUrl = new URL(index); //creer un objet
let indexParams = new URLSearchParams(indexUrl.search);


//tableaux
let arrayUn =[];
let arrayDeux =[];
let arrayTrois =[];

//get
let famille =indexUrl.searchParams.get("category");

//fonctions-------------------------------------------------------


/* afficher chaque projet*/
function afficherProjets(projects) {
    //gallery.parentNode.removeChild(figure);
    gallery.innerHTML="";
    for (let project of projects) { 
        //création d'une balise figure
        const projectFigure = document.createElement("figure");
        //création de la balise image
        const projectImage = document.createElement("img");
        //on ajoute la source de la photo
        projectImage.src = project.imageUrl;
        //ajout de l'alt
        projectImage.alt = project.title;
        projectImage.crossOrigin = "anonymous";
        //création de la balise figcaption
        const projectFigcaption = document.createElement("figcaption");
        //on ajoute le titre de la photo
        projectFigcaption.innerText = project.title;
        //on rattache les éléments entre eux
        gallery.appendChild(projectFigure);
        projectFigure.appendChild(projectImage);
        projectFigure.appendChild(projectFigcaption);

    }
}

//creation des boutons filtres
function creerFiltres(categories) {
    //création de la div filtres
    const filtreDivision = `<div id="filtres"></div>`;
    gallery.insertAdjacentHTML("beforebegin",filtreDivision);
    const filtreDiv = document.getElementById("filtres");
    //filtre tous
    const categoryAll = document.createElement("a");
    categoryAll.innerText = "Tous";
    categoryAll.className = "filtre";
    //suppression des parametres Url existants
    indexUrl.searchParams.delete("category");
    categoryAll.href = indexUrl;
    filtreDiv.appendChild(categoryAll);
    //autres filtres
    for (let category of categories) {
        const categoryButton = document.createElement("a");
        categoryButton.innerText = category.name;
        categoryButton.className = "filtre";
        //ajout parametres à url index
        indexUrl.searchParams.set("category", category.id);
        categoryButton.href = indexUrl;
        const newUrl = indexParams.getAll;
        console.log(newUrl);
        filtreDiv.appendChild(categoryButton);
    }
}

//fonction tri+affichage

function trierProjets(projects) {
    for (let project of projects) {
        if (project.categoryId==1) {
            arrayUn.push(project);
        }
        if (project.categoryId===2) {
            arrayDeux.push(project);
        }
        if (project.categoryId===3) {
            arrayTrois.push(project);
        }
        
    }
    afficherProjetsPlus(projects);
}
//fonction 
function afficherProjetsPlus (projects) {
    if (indexUrl.searchParams.get==null) {
        afficherProjets (projects);
    }
    if (famille==1) {
        afficherProjets (arrayUn);
    }
    if (famille==2) {
        afficherProjets (arrayDeux);
    }
    if (famille==3) {
        afficherProjets (arrayTrois);
    }  
} 
//---------------------------------------------------------------------


//appel api categories pour création filtres
fetch ("http://localhost:5678/api/categories")
.then (function(res){
    return res.json();
})
. then (function(categories){
    console.log(categories);
    creerFiltres(categories);
    //crerTableaux(categories);
} );

//récupération des données de l'API
fetch ("http://localhost:5678/api/works")
.then (function(res){
    if (res.ok){
        return res.json();
    }
}
)
.then (function(projects) {
    console.log(projects);
    trierProjets(projects);  
}
)
;











