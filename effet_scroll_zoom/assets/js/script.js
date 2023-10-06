// je déclare en tete de document tous mes éléments HTML
//const imgContainer = document.querySelector("#imgContainer");
const imgContainer = document.getElementById("imgContainer");
const img = document.querySelector("#imgContainer img");


function getRatio(offset) {

    if (offset < 350) {
        return 1; // 100% scaling below 350 pixels
    } else if (offset <= 700) {
        // Scale from 100% to 150% between 350 and 700 pixels
        return 1 + 0.5 * (offset - 350) / 350;
    } else if (offset <= 1050) {
        // Scale down to 100% between 700 and 1050 pixels
        return 1 + 0.5 * (1050 - offset) / 350;
    }
    else{
        return 1;
    }
}


window.addEventListener("scroll", () => {

    const ratio = getRatio(window.scrollY);
    img.style.transform = `scale(${ratio})`;
});