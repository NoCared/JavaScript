//fonction basique
function hello() {
    console.log("Hello World");
}
hello();








// fonction fléchée
const maFonction = () => { console.log("Hello World"); };
maFonction();








// raccourcis quand on a une seule instruction
const maFonctionBis = () => console.log("Hello World bis");
maFonctionBis();
// on peut enlever les parentheses si on a qu'un seul argument 
const maFonctionTer = parametre=> console.log("Hello World " + parametre);
maFonctionTer("Ter");








//setTimeout (temps est en ms)
// creation d'une fonction qui pourra créer à la fin du body 
// une div qui contiendra le texte "bonjour"
const creationDiv = ()=>{
    const divCreated = document.createElement("div");
    divCreated.textContent = "bonjour";
    document.body.append(divCreated);
};

// lors de l'utilisation d'une fonction en parametre d'une autre 
// je ne peux pas utiliser les parenthèses
setTimeout(creationDiv, 4000);

const creationDivBis = param =>{
    const divCreated = document.createElement("div");
    divCreated.textContent = param;
    document.body.append(divCreated);
};

setTimeout(()=>creationDivBis("rebonjour"), 4000);

// setInterval repete les memes instructions à une intervalle de temps défini
let chrono = 0;
const interChrono = setInterval(()=> console.log(++chrono),1000);
// et l'arrete au bout de 10 secondes
setTimeout(()=> clearInterval(interChrono),10000);