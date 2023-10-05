// commentaire comme en c++/ c#


//A ne pas faire
var maVariable = "Chaine de caractere";
var maVariable = 8;
//corrigé après 2015 (ES6)
let maVariableLet = "Chaine de caractere";
maVariableLet = 1;
const maVariableConst = "Chaine de caractere";
//maVariableConst = 5; provoque une erreur


const colorArray = ["blue", "red", "green"];
//colorArray = ["blue", "red", "green", "orange"]; ne marche pas car on réassigne une valeur
colorArray.push("yellow");// push marche car il n'y a pas de redéfinition ni de réassignation
colorArray[1] = "green";// on peut modifier un élément comme cela

console.log(colorArray);



// les HTMLElements
let prenom = "Paul";
const user = document.getElementById("user");

//console.log(user); ne pas oublier le defer dans la balise script pour cahrger le script après l'html

// console.dir() ou cdi permet de voir tous les éléments de la variable en détail
console.dir(user);
user.innerText = prenom;
//user.style.backgroundColor = "Green"; // Pas bien du tout -> ajoute la propriété dans le html
user.classList.add("green"); // Ce qu'il faut faire -> passer par le css

user.classList.remove("lambda");

// event sur un HTMLElement
user.addEventListener("click", (event) => {
    console.dir(event);
    user.classList.toggle("green");
    user.classList.toggle("yellow");
});




// Declaration d'objet
const employe = {
    nom: "Bob",
    poste: "comptable",
    date_embauche: "2021-08-23",
    rappel: () => alert("Au boulot !"),
};

console.log(employe.nom);

//employe.rappel();


const employes = [
    {
        nom: "Bob",
        poste: "comptable",
        date_embauche: "2021-08-23",
    },
    {
        nom: "Patrick",
        poste: "responsable camping",
        date_embauche: "2018-08-23",
    },
    {
        nom: "M. Crabe",
        poste: "chef",
        date_embauche: "2023-08-23",
    },
];

let ctr = 0;
while (ctr < employes.length) {
    console.log(employes[ctr].nom);
    ctr++;
}

for (let i = 0; i < employes.length; i++) {
    console.log(employes[i].nom);
}

employes.forEach((element, index) => console.log(index + " " + element.nom));

////La boucle la plus rapide :
// let len = employes.length;
// while (len--)
// {
//     console.log(employes[len].nom);
// }



