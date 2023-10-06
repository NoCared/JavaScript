const h1 = document.querySelector("h1");

const observer = new IntersectionObserver((entries) => {
    // ici au moment de l'entrée de mes éléments
    // j'ajoute le style css pour l'effet désiré
    entries.forEach(element => {
        if (element.isIntersecting) {
            element.target.classList.add("enterEffect");
            console.log("enter");
        }
        else {
            element.target.classList.remove("enterEffect");
            console.log("exit");
        }
    }, { threshold: 1});
});

observer.observe(h1);