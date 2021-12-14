//appel de la fonction de récupération des données
//si la pop up existe mettre un addlistener
let popupData;
getData();

//fonction de récupération des données

function getData() {
  let fetchData = {
    method: "GET",
    header: { "Content-type": "application/json" },
  };
  fetch("userList.php", fetchData)
    .then((response) => response.json())
    .then((response) => affichage(response))
    .catch((error) => failure(error));
}

//Affiche des lignes de tableaux <tr><td></td><td></td></tr> insertion dans <tbody>
function affichage(data) {
  popupData = data;
  if (document.querySelector("#userList").hasChildNodes())
    document.querySelector("#userList").innerHTML = "";

  for (const elt of data) {
    // let html =
    //   "<tr><td>" +
    //   elt.pseudo +
    //   "</td><td>" +
    //   elt.alias +
    //   "</td><td>" +
    //   elt.tel +
    //   "</td><td>" +
    //   elt.mail +
    //   "</td><td><img id='visu_" +
    //   elt.id +
    //   "' src='img/oeil_icon.svg' /></td><td><img id='edit_" +
    //   elt.id +
    //   "' src='img/pencil.svg' /></td><td><img id='supp_" +
    //   elt.id +
    //   "' src='img/trash.png' class='supp'/></td></tr>";
    let html =
      "<tr><td>" +
      elt.pseudo +
      "</td><td>" +
      elt.alias +
      "</td><td><img id='visu_" +
      elt.id +
      "' src='img/oeil_icon.svg' class='visu'/></td><td><img id='edit_" +
      elt.id +
      "' src='img/pencil.svg' /></td><td><img id='supp_" +
      elt.id +
      "' src='img/trash.png' class='supp'/></td></tr>";

    document.querySelector("#userList").innerHTML += html;

    let corbeilles = document.querySelectorAll(".supp");

    for (let corbeille of corbeilles) {
      corbeille.addEventListener("click", suppresion);
    }
  }
  let visus = document.querySelectorAll(".visu");
  for (let visu of visus) {
    visu.addEventListener("click", visualisation);
  }
}

function visualisation(event) {
  console.log(event.target.id);
  let key = buildKey(event.target.id);
  console.log(key);
  //affichage en PopUp
  let popup = document.createElement("div");
  popup.id = "popup";
  popup.classList.add("popup");
  document.querySelector("#wrapper").appendChild(popup);
  console.log(popupData);
  for (elt of popupData) {
    if(elt.id == key){
      //affichage des infos de la popup
      popup.innerHTML = '<p>pseudo: '+elt.pseudo+'</p>'
      popup.innerHTML += '<p>alias: '+elt.alias+'</p>'
      popup.innerHTML += '<p>mail: '+elt.mail+'</p>'
      popup.innerHTML += '<p>tel: '+elt.tel+'</p>';

      break;
    }
  }

  // document
  // .querySelectorAll('#wrapper')
  // .addEventListener('click', () => document.querySelector('#popup').remove())
}
function suppresion(event) {
  //appeler un php en lui envoyant la cle primaire de l'enregistrement à suppr
  // appel d'une fonction pour extraire la clé primaire de l'id

  let keykey = buildKey(event.target.id);
  let obj = {};
  obj.keykey = keykey;

  let fetchData = {
    method: "POST",
    body: JSON.stringify(obj),
    header: { "Content-type": "application/json" },
  };
  fetch("userDelete.php", fetchData)
    .then(getData)
    .catch((error) => failure(error));

  // .then((response) => response.json())
  //.then((response) => affichage(response))
}
function buildKey(id) {
  return id.slice(5); // retourne la clé primaire
}

function failure(error) {
  console.log(error);
}

// function affichage(data){
//     //affiche des lignes de tableau :
//     //console.log(data);
//     for(const elt of data){
//         console.log(elt);
//         let tr = document.createElement("tr");
//         document.getElementById('userList').appendChild(tr);

//         let tdNom = document.createElement("td");
//         tr.appendChild(tdNom);
//         tdNom.textContent=elt.nom;

//         let tdPrenom = document.createElement("td");
//         tr.appendChild(tdPrenom);
//         tdPrenom.textContent=elt.prenom;
//     }
// function visualisation(data) {
//   console.log(data);
//   if (document.querySelector("#userList").hasChildNodes())
//     document.querySelector("#userList").innerHTML = "";

//   for (const elt of data) {
//     let html =
//       "<tr><td>" +
//       elt.pseudo +
//       "</td><td>" +
//       elt.alias +
//       "</td><td>" +
//       elt.tel +
//       "</td><td>" +
//       elt.mail +
//       "</td><td><img class='visu' id='visu_" +
//       elt.id +
//       "' src='img/oeil_icon.svg' /></td><td><img id='edit_" +
//       elt.id +
//       "' src='img/pencil.svg' /></td><td><img id='supp_" +
//       elt.id +
//       "' src='img/trash.png' class='supp'/></td></tr>";
//     // let html =
//     //   "<tr><td>" +
//     //   elt.pseudo +
//     //   "</td><td>" +
//     //   elt.alias +
//     //   "</td><td><img id='visu_" +
//     //   elt.id +
//     //   "' src='img/oeil_icon.svg' /></td><td><img id='edit_" +
//     //   elt.id +
//     //   "' src='img/pencil.svg' /></td><td><img id='supp_" +
//     //   elt.id +
//     //   "' src='img/trash.png' class='supp'/></td></tr>";

//     document.querySelector("#userList").innerHTML += html;

//     let corbeilles = document.querySelectorAll(".visu");

//     for (let corbeille of corbeilles) {
//       corbeille.addEventListener("click", suppresion);
//     }
//   }
// }
