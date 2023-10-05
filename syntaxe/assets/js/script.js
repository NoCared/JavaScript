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

