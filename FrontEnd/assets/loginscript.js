//déclaration des variables
const form = document.querySelector("form");
const message= document.querySelector(".errorMessage");


form.addEventListener("submit", (e) => {
    e.preventDefault()

    let mailValue= e.target.mail.value;
    let passwordValue= e.target.password.value;
    let requestObject={
        "email": mailValue,
        "password": passwordValue
    }
    console.log(requestObject);

    fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestObject)
    })
    .then ((res) => {
        if (res.ok) {
            console.log(res);
            return res.json();

        }else if (res.status==404) {
            unknownUser();
            removeAll()
            check();
            throw Error("user not found");          
        }else if (res.status==401) {
            wrongPassword();
        }     
    })
    
    .then (function (response){        
        const tokenLogin = response.token;
        loginUser(response, tokenLogin);
    })
    
    
    
});

function loginUser(response, tokenLogin){
        //document.location.href="http://127.0.0.1:5500/FrontEnd/index.html";
        document.location.href="index.html";
        window.localStorage.setItem("token", tokenLogin);
        
    }
    
function unknownUser() {
    message.innerText="Utilisateur inconnu";
}
    

//-----------------------regex-----------------------------------------
 

//ecouter modif mail
form.mail.addEventListener('change',function() {
    validMail(this);
});

const validMail = function (inputEmail) {
    let mailRegEx= new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    testEmail= mailRegEx.test(inputEmail.value);

    if (testEmail) {
        message.innerText="";
        document.getElementById("mail").classList.remove("redAlert");
    } else {
        message.innerText="Veuillez saisir une adresse mail valide";
        document.getElementById("mail").classList.add("redAlert");
    }

}
//-------------------vérification champ formulaire--------------
    
function check() {
    if(form.password.value==""&&form.mail.value==""){
        message.innerText="Veuillez compléter les champs indiqués";
        document.getElementById("mail").classList.add("redAlert");
        document.getElementById("password").classList.add("redAlert");
    } else {

        if(form.password.value==""){
            message.innerText="Veuillez compléter le champ indiqué";
            removeAll();
            document.getElementById("password").classList.add("redAlert");
        }
        if(form.mail.value==""){
            message.innerText="Veuillez compléter le champ indiqué";
            removeAll();
            document.getElementById("mail").classList.add("redAlert");
        }
    }
}

function removeAll(){
    document.getElementById("mail").classList.remove("redAlert");
    document.getElementById("password").classList.remove("redAlert");
}
function wrongPassword(){
    if(form.password.value==""){
        message.innerText="Veuillez saisir le mot de passe";
        document.getElementById("password").classList.add("redAlert");
    }else{
        message.innerText="Erreur dans l'identifiant ou le mot de passe";
        document.getElementById("password").classList.add("redAlert"); 
    }
}
