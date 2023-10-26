const client = io();
const sendMessage = document.getElementById("sendMessage");
const displayMessages = document.getElementById("displayMessages");

const quill = new Quill('#editor', {
    theme: 'snow'
});

const createMessage = (data) =>
{
    displayMessages.innerHTML += 
    `<div class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${data.id}</h5>
        <small>${data.date}</small>
    </div>
    <p class="mb-1">${data.texte}</p>
</div>`
}


//Recupération des messages du server
client.emit("getMessages",{});
client.on("sendGlobalMessages",(data)=>{
    // je récupère à la connexion tous les messages du serveur
    // je lance une boucle qui devra créer dans le DOM autant
    // d'élements que de messages
    data.data.messages.forEach(element => {
        // ... creation de mes messages
        createMessage(element);
    });
});

sendMessage.addEventListener("click", () => {
    let texte = quill.getText();
    let date = new Date().toDateString();
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    client.emit('newMessage', {
        id: id,
        texte: texte,
        date: date
    })
    createMessage({id:id,texte:texte,date:date});
    quill.setText("");
});

client.on("newGlobalMessage",(data)=> {
    createMessage(data.data);
});