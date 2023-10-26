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
const fs = require('fs');

const app = express();

const hostName = '127.0.0.1';
const port = 8000;
const server = http.Server(app);
const io = require('socket.io')(server);
let userLogins;

const getNameFromID = (id) =>{
    let name ="";
    userLogins.user.forEach(element => {
        if (element.id === id)
        {
            name = element.login;
        }
    });
    return name;
}
const getIDFromName = (name) =>{
    let id ="";
    userLogins.user.forEach(element => {
        if (element.name === name)
        {
            id = element.id;
        }
    });
    return id;
}


fs.readFile("./data/users.json", (err, txt) => {
    console.dir("error " + err);
    userLogins = JSON.parse(txt);
    console.dir(userLogins);

});

io.on('connection', client => {
    client.on('init', data => {
        userLogins.user.forEach(element => {
            if (element.login === data.login && element.pwd === data.pwd) {
                client.emit("success", { "id": element.login });
            }
        });
        // j'ai besoin d'accéder à user.json confronter mes logs et pwd
    });

    client.on("getMessages", () => {
        let tmpMessages;
        fs.readFile("./data/messages.json", (err, dataMsg) => {
            tmpMessages = JSON.parse(dataMsg);
            client.emit("sendGlobalMessages", { data: tmpMessages });
        });
    });

    client.on('newMessage', (data) => {
        let tmpMessages;
        let name = data.id;
        data.id = getIDFromName(name);

        fs.readFile("./data/messages.json", (err, dataMsg) => {
            tmpMessages = JSON.parse(dataMsg);
            tmpMessages.messages.push(data);
            fs.writeFile("./data/messages.json", JSON.stringify(tmpMessages), (err) => {

            });
            data.id = name;
            client.broadcast.emit("newGlobalMessage", { "data": data });
        });
    });

    client.on('disconnect', () => { /* … */ });
});

// dans le but de cloisonner mon application coté serveur et les ressources
// destinées à mes clients  je crée un dossier public ou www
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});



server.listen(port, hostName, () => {
    console.log(`serveur running http://${hostName}:${port}`);
});


// Pour lancer mon serveur on écrit node --watch app.js dans un powershell qui se situe dans server
// ou alors passer par pm2 et écrire pm2 app.js


// SI LE NODE MODULE EST SUPPRIME
// faire la commande npm update


// -----------------------------------------------------------------