const client = io();
const sendMessage = document.getElementById("sendMessage");
const userList = document.querySelector("#list-group>div");
const displayMessages = document.getElementById("displayMessages");
const myModalSend = new bootstrap.Modal(document.getElementById('modalSend'));
const myModalReceive = new bootstrap.Modal(document.getElementById('modalReceive'));
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

let currentUsers = [];
let selectedUserID;

const quill = new Quill('#editor', {
    theme: 'snow'
});

const createMessage = (data) => {
    displayMessages.innerHTML +=
        `<div class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${data.id}</h5>
        <small>${data.date}</small>
    </div>
    <p class="mb-1">${data.texte}</p>
</div>`
}
const createUser = (data) => {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("list-group-item");
    createdDiv.textContent = data.id;
    createdDiv.addEventListener("click", () => {
        const modalTitle = document.querySelector('#modalSend .modal-title');
        selectedUserID = data.id;
        modalTitle.textContent = 'Private message to ' + selectedUserID;
        myModalSend.show();
    })
    userList.append(createdDiv);
    currentUsers.push({ id: data.id, elementHTML: createdDiv });
}

const sendPrivateMessage = (data) => {
    client.emit("sendPrivateMessage", data);
}

document.querySelector("#modalSend .btn-primary").addEventListener("click", () => {
    const textarea = document.querySelector('#modalSend .modal-body textarea');
    let content = textarea.value;
    sendPrivateMessage({ idReceiver: selectedUserID, content: content });
    textarea.value = "";
    myModalSend.hide();
});
document.querySelector("#modalSend .btn-secondary, #modalSend .btn-close").addEventListener("click", () => {
    selectedUserID = "";
    myModalSend.hide();
});

document.querySelector("#modalReceive .btn-secondary, #modalReceive .btn-close").addEventListener("click", () => {
    myModalSend.hide();
});


//Attente d'une seconde car l'id est undefined au début de la page
setTimeout(() => {
    client.emit("connected", { idName: id, realId: client.id });
}, 1000);

//Recupération des messages du server

client.emit("getMessages", {});

client.emit("getUsers", {});

client.on("currentUsers", (data) => {
    data.userList.forEach(element => {
        createUser(element);
    });
});

client.on("sendGlobalMessages", (data) => {
    // je récupère à la connexion tous les messages du serveur
    // je lance une boucle qui devra créer dans le DOM autant
    // d'élements que de messages
    data.data.messages.forEach(element => {
        // ... creation de mes messages
        createMessage(element);
    });
});

client.on("newPrivateMessageResponse", (data) => {

    const modalTitle = document.querySelector('#modalReceive .modal-title');
    modalTitle.textContent = 'Private message from ' + data.fromUser;
    const textarea = document.querySelector('#modalReceive .modal-body input');
    textarea.value = data.content;
    myModalReceive.show();
});

sendMessage.addEventListener("click", () => {
    let texte = quill.getText();
    let date = new Date().toDateString();
    client.emit('newMessage', {
        id: id,
        texte: texte,
        date: date
    })
    createMessage({ id: id, texte: texte, date: date });
    quill.setText("");
});

client.on("newGlobalMessage", (data) => {
    createMessage(data.data);
});