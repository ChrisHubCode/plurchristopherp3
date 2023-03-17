const form = document.querySelector("form");
//const tokenLogin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
const message= document.querySelector(".errorMessage");


//localStorage.clear();

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Email:", e.target.mail.value)
    console.log("password:", e.target.password.value)
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
            //alert("user not found");
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
        document.location.href="http://127.0.0.1:5500/FrontEnd/index.html";
        window.localStorage.setItem("token", tokenLogin);
        
    }
    
function unknownUser() {
    /*const loginSection= document.querySelector("#loginSection");
    const messageAlert=document.createElement("p");
    messageAlert.innerText="Utilisateur inconnu";
    messageAlert.className="messageAlert";
    loginSection.insertBefore(messageAlert, loginSection.firstChild);*/
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
    console.log(testEmail);

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
        message.innerText="Mot de passe incorrect";
        document.getElementById("password").classList.add("redAlert"); 
    }
}
