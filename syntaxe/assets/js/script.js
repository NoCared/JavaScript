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
