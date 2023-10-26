const client = io();
const formLogin = document.forms.formLogin;

formLogin.addEventListener("submit", (e) => {
    // j'empeche le submit de mon client (recharger la page)
    e.preventDefault();
    // je récupère les données du formulaire
    let login = formLogin.login.value;
    let pwd = formLogin.pwd.value;
    //On envoie les données au format json
    client.emit("init", { "login": login, "pwd": pwd })
});

client.on("success", (data) => {
    window.location = "./chat.html?id=" + data.id;
});
