<?php
//definition des valeurs de connexion

define('BDD', 'crud');
define('SERVER','localhost');
define('USERNAME','root');
define('PWD','');
define('PORT', 3306);

try {
    $bdd = new PDO("mysql:host =".SERVER.";dbname=".BDD,USERNAME, PWD); 
}
catch(PDOException $error){
    var_dump($error->getMessage());
    exit();
}