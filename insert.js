//1- ecoute : click sur le bouton
//2- verification des données du formulaire
//3- si pas bon, envoi de messages
//4- si c'est bon, creation d'un object litteral
//5- transformation en notation JSON
//6- envoie vers le php (dans le js, je ne m'occupe pas de ce qui ce passe dans le php)
//7- ecoute du retour du php : ok ou pas ? --> message à l'interface

//1-
let insert = document.querySelector("#insert");
insert.addEventListener("click", createObject);

//4-
function createObject() {
  let data = {};
  data.pseudo = document.querySelector("#pseudo").value;
  data.alias = document.querySelector("#alias").value;
  data.mail = document.querySelector("#mail").value;
  data.tel = document.querySelector("#tel").value;

  //5-
  let dataJson = JSON.stringify(data);
  sendData(dataJson);
}

//6-
function sendData(dataJson) {
  let fetchData = {
    method: "POST",
    body: dataJson,
    header: { "Content-type": "application/json" },
  };

  fetch("insert.php", fetchData)
    .then((response) => response.json())
    .then((response) => succes(response))
    .catch((error) => failure(error));
}

//7-
function succes(response) {
  console.log(response);
}

function failure(error) {
  console.log(error);
}
