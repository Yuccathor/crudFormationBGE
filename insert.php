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
//$decoded->msg = 'insertion OK';

require('cnx.php'); // ouvre la connexion à la base données
// oldschool method
//$sql = 'INSERT INTO crud.util(pseudo,alias,mail,tel) VALUES("'.$decoded->pseudo.'","'.$decoded->alias.'","'.$decoded->mail.'","'.$decoded->tel.'",)';
// methode pas ouf
//$sql = 'INSERT INTO crud.util(pseudo,alias,mail,tel) VALUES (?,?,?,?)';
//best method
$sql = 'INSERT INTO crud.util(pseudo,alias,mail,tel) VALUES (:pseudo,:alias,:mail,:tel)';
$req = $bdd->prepare($sql);


//Par tableau associatif :
$data = array(
    ':pseudo' =>$decoded->pseudo,
    ':alias' =>$decoded->alias,
    ':mail' =>$decoded->mail,
    ':tel' =>$decoded->tel

);

$req->execute($data);
//En utilisant BindValue :
// $req->bindValue(':pseudo', $decoded->pseudo);
// $req->bindValue(':alias', $decoded->alias);
// $req->bindValue(':mail', $decoded->mail);
// $req->bindValue(':tel', $decoded->tel);
// $req->execute(); //ecrit dans la base de données

$bdd = null; //fermeture de la connexion
$reply = array(
    'msg' => 'insertion OK'
);
echo json_encode($reply);