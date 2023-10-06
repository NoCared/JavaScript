const button = document.querySelector("button");
let displayModale = false;

button.addEventListener("click", () => {

    if (!displayModale) {
        const modale = document.createElement("div");
        modale.id = "modale";
        modale.innerText = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora sequi voluptatem fugit ex, exercitationem expedita accusantium similique totam quas iste aperiam non, nulla commodi facilis harum beatae iusto id dolores.";
        document.body.append(modale);
    }
    else
    {
        document.querySelector("#modale").remove();
    }
    displayModale = !displayModale;
});