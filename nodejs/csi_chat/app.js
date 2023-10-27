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
let userLogged = [];

const getRealIDFromName = (name)=>
{
    let id = null;
    userLogged.forEach(element =>{
        if (name === element.name)
        {
            id = element.relatedId;
        }
    });
    return id;
}
const getNameFromRelatedID = (id)=>
{
    let name = null;
    userLogged.forEach(element =>{
        if (id === element.relatedId)
        {
            name = element.name;
        }
    });
    return name;
}


fs.readFile("./data/users.json", (err, txt) => {
    console.dir("error " + err);
    userLogins = JSON.parse(txt);

});

io.on('connection', client => {
    client.on('init', data => {
        userLogins.user.forEach(element => {
            if (element.login === data.login && element.pwd === data.pwd) {
                client.emit("success", { "id": element.id });
            }
        });
        // j'ai besoin d'accéder à user.json confronter mes logs et pwd
    });

    client.on("connected", (data) => {
        let isAlreadyLogged = false;
        userLogged.forEach(element => {
            if (element.id === data.idName) {
                element.relatedId = data.realId;
                isAlreadyLogged = true;
            }
        });

        if (isAlreadyLogged === false) {
            userLogged.push({ name: data.idName, relatedId: data.realId });
        }
    });

    client.on("getMessages", () => {
        let tmpMessages;
        fs.readFile("./data/messages.json", (err, dataMsg) => {
            tmpMessages = JSON.parse(dataMsg);
            client.emit("sendGlobalMessages", { data: tmpMessages });
        });
    });

    client.on("sendPrivateMessage", (data) => {

        let receiveId = getRealIDFromName(data.idReceiver);
        if (receiveId != null){
            client.to(receiveId).emit("newPrivateMessageResponse", {
                content: data.content,
                fromUser: getNameFromRelatedID(client.id)
            });
        }
    });

    client.on("getUsers", () => {
        let tmpUsers;
        fs.readFile("./data/users.json", (err, dataMsg) => {
            tmpUsers = JSON.parse(dataMsg);
            let userList = [];
            tmpUsers.user.forEach(element => {
                userList.push({ id: element.id });
            });
            client.emit("currentUsers", { userList: userList });
        });
    });

    client.on('newMessage', (data) => {
        let tmpMessages;

        fs.readFile("./data/messages.json", (err, dataMsg) => {
            tmpMessages = JSON.parse(dataMsg);
            tmpMessages.messages.push(data);
            fs.writeFile("./data/messages.json", JSON.stringify(tmpMessages), (err) => {

            });
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