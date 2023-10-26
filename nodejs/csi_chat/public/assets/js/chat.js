
const client = io();
const sendMessage = document.getElementById("sendMessage");


const quill = new Quill('#editor', {
    theme: 'snow'
});

sendMessage.addEventListener("click", () => {
    let texte = quill.getText();
    let date = new Date();
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    client.emit('newMessage', {
        id: id,
        texte: texte,
        date: date
    })
});