// pour creer mon projet
// j'utilise dans mon terminal la commande npm init

// une fois le node_modules a été créé il faut l'écrire dans le gitignore 
// car le fichier est trop gros

// installation express npm i express
// ce module express sera chargé de distribuer le fichier index.html auprès de mes clients
const express = require('express');

// import du module http (déja présent avec express) pour effectuer, entre mon serveur et
// mes clients, les requetes HTTP
const http = require('http');


const app = express();

// dans le but de cloisonner mon application coté serveur et les ressources
// destinées à mes clients  je cré
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile('index.html',{root: __dirname});
});


const hostName = '127.0.0.1';
const port = 8000;
const server = http.Server(app);
server.listen(port,hostName,()=>{
    console.log(`serveur running http://${hostName}:${port}`);
});


// Pour lancer mon serveur on écrit node --watch app.js dans un powershell qui se situe dans server
// ou alors passer par pm2 et écrire pm2 app.js