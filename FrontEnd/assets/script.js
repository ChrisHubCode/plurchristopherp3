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

//preview image
const inputPreview= document.getElementById("inputFile");
const land= document.querySelector(".landIcon");
const labelPhoto= document.querySelector(".fileLabel");
const specs= document.querySelector(".specs");

//admin
const bodySelect = document.querySelector("body");
const iconPen = `<i class="fa-sharp fa-regular fa-pen-to-square"></i>`;
const login= document.querySelector("#loginNav");
const iconModif= `<i class="fa-sharp fa-regular fa-pen-to-square"></i> modifier`
const figModif= document.querySelector("figure");
const iconArrow=`<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
const iconTrash=`<i class="fa-solid fa-trash-can"></i>`

let photoTitle= document.querySelector(".photoTitle");
let validBtn= document.getElementById("buttonValid");

const errorForm=document.querySelector("#errorForm");

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

//fonction création catégorie dans modale
function categoryModal (categories){
    for (let category of categories){
        const optionCategory= document.createElement("option");
        optionCategory.value=category.id;
        optionCategory.innerHTML=category.name;
        document.querySelector("#categorySelect").appendChild(optionCategory);
    }
}

//modification de la page en admin mode
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

//modifie l'élément login en logout
function loginInOut(){
    login.innerHTML="logout";
    login.addEventListener("click",()=>{
        localStorage.clear();
        login.innerHTML="login";
        location.reload();
    })
}

//créer la modale
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
    tryDelete();
    returnModal();
}

//fonctions qui modifient les modale/fermeture modale
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
    const trash= `<div class= "trash" data-id="${project.id}"><i class="fa-solid fa-trash-can"></i></div>`;
    modalFigure.insertAdjacentHTML("beforeend",trash);
}


//-------------------------------------fetch api------------------------------------------


//appel api categories pour création filtres
fetch ("http://localhost:5678/api/categories")
.then (function(res){
    return res.json();
})
. then (function(categories){
    console.log(categories);
    creerFiltres(categories);
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
    afficherProjetsFinal(projects);
    creerModale(projects);
}
)
;

//----------------creation page admin-------------------------------

//passe la page index en mode admin si user loggé
if (localStorage.getItem("token") !== null) {
    adminMod();
    loginInOut();   
}

//-----------------modale ajout photo----------------------------

photoTitle.addEventListener("change", function(){
    if(photoTitle.value!=="" && specs.classList.length==2){
        //changer la couleur du bouton si champs remplis
        validBtn.classList.add("green");
        errorForm.innerHTML="";


        document.querySelector(".validBtn").addEventListener("click",()=>{
            let newPicture= document.getElementById('inputFile').files[0];
            newPicture.crossOrigin="anonymous";
            let newPictureTitle= document.querySelector(".photoTitle").value;
            let newPictureCategory= document.querySelector("#categorySelect").value;
            
            const formData= new FormData();
            formData.append("image", newPicture),
            formData.append("title", newPictureTitle),
            formData.append("category", newPictureCategory);
            
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: 'application/json',
                },
                body: formData
                
            })
        
            .then ((res) => {
                if (res.ok) {
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
            .then (function(project){
                addLastModal(project);
                afficherProjet(project);
            })
            ;
            modalAdd.classList.remove("clearNone");
            modal.classList.add("clearNone");   
            
        })
        
    }else {
        validBtn.classList.remove("green");
        errorForm.innerHTML="Une photo et un titre sont indispensables pour ajouter un projet";
        document.querySelector(".validBtn").addEventListener("click", function(event){
            event.preventDefault();
        });
    }
});




//------------fonction delete projet---------------------------------------------

function tryDelete(){
    let poubelles= document.getElementsByClassName("trash");
    for(let poubelle of poubelles){
        poubelle.addEventListener("click", deletePhoto);
    }
}
function deletePhoto() {
  let idDelete = this.dataset.id;

  fetch(`http://localhost:5678/api/works/${idDelete}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      console.log("le projet a été supprimé");
      //return(res.json);
    } else {
      alert("le projet n'a pas été supprimé");
    }
  });
  fetch("http://localhost:5678/api/works")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (projects) {
      console.log(projects);
      afficherProjetsFinal(projects);
      creerModale(projects);
    });
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







 
    
