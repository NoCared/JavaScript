

const recherche = document.querySelector("[name='recherche']");
const retour = document.querySelector("#retour");
let maRecherche;
// fonction fetch ajax ASYNC
// la fonction fetch envoie une requete à une url (son parametre)
fetch('./assets/games/games.json')
    // puis (then) convertit le résultat en text (.text()) ou en json (.json)
    .then((response) => response.json())
    // puis je peux récupérer le résultat (texte/json) pour l'exploiterdans mon javascript
    .then((result) => {
        maRecherche = result;
    }).finally(() => {
        recherche.addEventListener("keyup", () => {


            const research = rechercheParValeur(maRecherche, "title", recherche.value);

            if (research != null) {
                retour.innerHTML =
                    `<h1>${research.title} </h1>
                        <p>- genre: ${research.genre} </p>
                        <p>- platform: ${research.platform} </p>
                        <p>- developer: ${research.developer} </p>
                        <img src="${research.thumbnail}"/>`;
            }
            else {
                retour.innerHTML = "";
            }
        });
    })




const rechercheParValeur = (tab, champ, value) => {
    for (const [key, valeur] of Object.entries(tab)) {
        if (valeur[champ].includes(value)) {
            return valeur;
        }
    }

    return null;
}

const rechercheParValeur2 = (tab, champ, value) => {
    for (const key in tab) {
        const element = tab[key][champ];
        if (element === value) {
            return tab[key];
        }
    }
    return null;
}