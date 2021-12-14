<?php

require('cnx.php'); // ouvre la connexion à la base données
// lecture des enregistrements de la table
$sql = 'SELECT * FROM crud.util ORDER BY pseudo ASC';
$req = $bdd->query($sql); //PDO vs FETCH
$data = $req->fetchAll(PDO::FETCH_ASSOC); //fetchALL versus fetch
$bdd = null; //deconexion
// var_dump($data);

// envoyer les données vers le JS.
$obj = json_encode($data);
echo $obj;