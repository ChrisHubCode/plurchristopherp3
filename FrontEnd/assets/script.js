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

//modale
const gallModal= document.querySelector(".galleryModal");
const modalBox= document.querySelector(".modalBox");
const modal= document.querySelector(".modal");
const modalAdd= document.querySelector(".modalAdd")

//authorisation
const userToken= localStorage.getItem("token");
console.log(userToken);
window.sessionStorage.setItem("user", userToken);
const userData= sessionStorage.getItem("user");

//preview
const inputPreview= document.getElementById("inputFile");
const land= document.querySelector(".landIcon");
const labelPhoto= document.querySelector(".fileLabel");
const specs= document.querySelector(".specs");

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
//afficher un seul projet
function afficherProjet(project) {
    //gallery.parentNode.removeChild(figure);
    //gallery.innerHTML = "";

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
    //suppression filtres si admin mod
    if (localStorage.getItem("token") !== null) {
        filtreDiv.innerHTML="";   
    }
    
}
//function qui permet l'affichage des projets + tri
function afficherProjetsFinal(projects) {
    if (famille==null) {
        afficherProjets (projects);
    } else {
        gallery.innerHTML = "";
        for (let project of projects){
            if (famille==project.categoryId) {
                afficherProjet(project);
            }
        }
    } 
} 

//fonction tri+affichage ancienne version/ non utilisé

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
//fonction ancienne version/ non utilisé 
function afficherProjetsPlus (projects) {
    if (famille==null) {
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

//fonction création catégorie dans modale
function categoryModal (categories){
    for (let category of categories){
        const optionCategory= document.createElement("option");
        optionCategory.value=category.id;
        optionCategory.innerHTML=category.name;
        document.querySelector("#categorySelect").appendChild(optionCategory);
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
    categoryModal(categories);
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
    //trierProjets(projects);  
    afficherProjetsFinal(projects);
    creerModale(projects);
}
)
;






//----------------creation page admin-------------------------------
//const headerPoint=document.querySelector("header");
const bodySelect = document.querySelector("body");
const iconPen = `<i class="fa-sharp fa-regular fa-pen-to-square"></i>`;
const login= document.querySelector("#loginNav");
const iconModif= `<i class="fa-sharp fa-regular fa-pen-to-square"></i> modifier`
const figModif= document.querySelector("figure");
const iconArrow=`<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
const iconTrash=`<i class="fa-solid fa-trash-can"></i>`



if (localStorage.getItem("token") !== null) {
    adminMod();
    loginInOut();
    
    
}

//modification de la page
function adminMod(){
    //afficher le bandeau noir
    const blackTape= document.createElement("div");
    blackTape.className="blackTape";
    bodySelect.prepend(blackTape);
    const editionMod= document.createElement("p");
    editionMod.className= "editionMod";
    editionMod.innerHTML=`<i class="fa-sharp fa-regular fa-pen-to-square"></i> Mode édition`;
    blackTape.appendChild(editionMod);
    const publish= document.createElement("button");
    publish.className= "publish";
    publish.innerText="publier les changements";
    blackTape.appendChild(publish);
    //afficher les "modifier"
    const pModif = document.createElement("p");
    pModif.className="pModif";
    const pModifUn = document.createElement("p");
    const pModifProject = document.createElement("span");
    pModifProject.className= "modifProject";
    figModif.appendChild(pModif);
    pModif.innerHTML= iconModif;
    document.querySelector("article").prepend(pModifUn);
    pModifUn.innerHTML= iconModif;
    document.querySelector("#myProjectsTitle").appendChild(pModifProject);
    pModifProject.innerHTML= iconModif;
    
    afficherModale();
    
}
function loginInOut(){
    login.innerHTML="logout";
    login.addEventListener("click",()=>{
        alert("click");
        localStorage.clear();
        login.innerHTML="login";

    })

}


//----------------------Modale---------------------------------





function creerModale (projects) {
    gallModal.innerHTML="";
    for (let project of projects) { 
        const modalFigure = document.createElement("figure");
        modalFigure.className= "modalFig";
        const modalImage = document.createElement("img");
        modalImage.className= "modalImg";
        modalImage.src = project.imageUrl;
        modalImage.alt = project.title;
        modalImage.crossOrigin = "anonymous";
        const modalEdit = document.createElement("p");
        modalEdit.innerText = "éditer";
        gallModal.appendChild(modalFigure);
        modalFigure.appendChild(modalImage);
        modalFigure.appendChild(modalEdit);

        //ajout des icones
        const arrow= document.createElement("div");
        arrow.className="arrow";
        modalFigure.appendChild(arrow);
        arrow.innerHTML= iconArrow;
        const trash= `<div class= trash data-id="${project.id}"></div>`;
        //trash.className="trash";
        //modalFigure.appendChild(trash);
        modalFigure.insertAdjacentHTML("beforeend",trash);
        //trash.innerHTML= iconTrash;
        //document.getElementsByClassName("trash").innerHTML=iconTrash;
        

    }
    const allTrashes= document.querySelectorAll(".trash");
    for (let trashe of allTrashes){
        trashe.innerHTML= iconTrash;
    }

    //document.getElementsByClassName("trash")[11].innerHTML=iconTrash;
    tryDelete();
    

    returnModal();
    
}
/*pModifProject.addEventListener("click",()=>{
    modalFigure.classList.add("clarNone");
})*/

//-----------------modale ajout photo----------------------------

//fonction qui modifie la modale deja existante

function returnModal(){
    document.querySelector(".returnModal").addEventListener("click",()=>{
        modal.classList.add("clearNone");
        modalAdd.classList.remove("clearNone");
    })
}

function afficherModale(){
        document.querySelector(".modifProject").addEventListener("click",()=>{
        modal.classList.add("clearNone");
    })
    afficherModaleAjout();
    closeModalWindow();
    //afficherMiniature();
}

function afficherModaleAjout(){
    document.querySelector(".addPhoto").addEventListener("click",()=>{
        modal.classList.remove("clearNone");
        modalAdd.classList.add("clearNone");
    })
}
function closeModalWindow(){
    document.querySelector(".modalBox").addEventListener("click",(e)=>{
        e.stopPropagation();
    })
    document.querySelector(".modal").addEventListener("click", ()=>{
        modal.classList.remove("clearNone");
        
    })
    document.querySelector(".closeModal").addEventListener("click", ()=>{
        modal.classList.remove("clearNone"); 
    })
    document.querySelector(".modalBoxAdd").addEventListener("click",(e)=>{
        e.stopPropagation();
    })
    document.querySelector(".modalAdd").addEventListener("click", ()=>{
        modalAdd.classList.remove("clearNone");  
    })
    document.querySelector(".closeModalAdd").addEventListener("click", ()=>{
        modalAdd.classList.remove("clearNone"); 
    })
}



document.querySelector(".validBtn").addEventListener("click",()=>{
    console.log("fichier:"+document.getElementById('inputFile').files[0])
    let newPicture= document.getElementById('inputFile').files[0];
    newPicture.crossOrigin="anonymous";
    let newPictureTitle= document.querySelector(".photoTitle").value;
    let newPictureCategory= document.querySelector("#categorySelect").value;
    console.log(newPicture);
    console.log(newPictureTitle);
    console.log(newPictureCategory);
    console.log(typeof newPictureCategory);
    
    const formData= new FormData();
    formData.append("image", newPicture),
    formData.append("title", newPictureTitle),
    formData.append("category", newPictureCategory);
    
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
            //"Content-type": 'application/json',
        },
        body: formData
        
    })

    .then ((res) => {
        if (res.ok) {
            console.log(res);
            return res.json();

        }else if (res.status==400) {
            
            console.log("erreur bad request") ;
            console.log(res);        
        }else if (res.status==500) {
            console.log("erreur innatendue");
            console.log(res);
        }else if (res.status==401) {
            console.log(res);
            
        }

    })
    ;
    modalAdd.classList.remove("clearNone");
    modal.classList.add("clearNone");

    
    
})


//------------fonction delete projet---------------------------------------------

function tryDelete(){
    let poubelles= document.getElementsByClassName("trash");
    for(let poubelle of poubelles){
        poubelle.addEventListener("click", deletePhoto);
    }
}
function deletePhoto(){
    let idDelete=this.dataset.id;
    console.log("l'ID est:"+idDelete);

    fetch(`http://localhost:5678/api/works/${idDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json"
        
      },
    })
    .then((res) =>{
        if (res.ok){
            console.log("le projet a été supprimé");
            //return(res.json);
        }else{
            alert("le projet n'a pas été supprimé");
        }
    }
    )
    fetch ("http://localhost:5678/api/works")
.then (function(res){
    if (res.ok){
        return res.json();
    }
}
)
.then (function(projects) {
    console.log(projects);
    //trierProjets(projects);  
    afficherProjetsFinal(projects);
    creerModale(projects);
}
)
;  
}


// afficher image preview lors d'un ajout de photo
inputPreview.addEventListener("change",(e)=>{
    const srcPreview= URL.createObjectURL(e.target.files[0]);
    const preview= document.getElementById("preview");
    preview.src=srcPreview;
    //supression des éléments existant
    land.classList.add("none");
    labelPhoto.classList.add("none");
    specs.classList.add("none");
})

//fonction pour ajouter le dernier projet à la gallery de la modale /non utilisé
function addLastModal (project) {
    
        const modalFigure = document.createElement("figure");
        modalFigure.className= "modalFig";
        const modalImage = document.createElement("img");
        modalImage.className= "modalImg";
        modalImage.src = project.imageUrl;
        modalImage.alt = project.title;
        modalImage.crossOrigin = "anonymous";
        const modalEdit = document.createElement("p");
        modalEdit.innerText = "éditer";
        gallModal.appendChild(modalFigure);
        modalFigure.appendChild(modalImage);
        modalFigure.appendChild(modalEdit);
        //ajout des icones
        const arrow= document.createElement("div");
        arrow.className="arrow";
        modalFigure.appendChild(arrow);
        arrow.innerHTML= iconArrow;
        const trash= `<div class= trash data-id="${project.id}"></div>`;
        modalFigure.insertAdjacentHTML("beforeend",trash);
        trash.innerHTML=iconTrash;
    }

 
    
