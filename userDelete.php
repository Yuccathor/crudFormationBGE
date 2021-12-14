<?php
// recevoir les données
// decoder les données --> dans une valiable
// connexion à la base de données
// écriture de la renquête : plusieurs façons d'écriture
// préparation de la renquête
// execution de la requete
// envoi d'un message au js ou pas ok

$content = file_get_contents("php://input");
$decoded = json_decode($content);

require('cnx.php'); // ouvre la connexion à la base données
$sql = 'DELETE FROM crud.util where id=:id';
$req = $bdd->prepare($sql);

        //Par tableau associatif :
// $data = array(
//     ':id' =>$decoded->key

// );
        //En utilisant BindValue :
$req->bindValue(':id', $decoded->keykey);
// $req->bindValue(':pseudo', $decoded->pseudo);
// $req->bindValue(':alias', $decoded->alias);
// $req->bindValue(':mail', $decoded->mail);
// $req->bindValue(':tel', $decoded->tel);
// $req->execute(); //ecrit dans la base de données

$bdd = NULL; //fermeture de la connexion
$req->execute();