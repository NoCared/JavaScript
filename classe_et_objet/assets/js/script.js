// creation objet
const objetDiv = {
    tag: "div",
    style: [],
    content: {
        texte: "blabla",
        elementHTML: {}
    },
    id: "",
    createElem: () => {
        const createdObject = document.createElement(objetDiv.tag);
        createdObject.textContent = objetDiv.content.texte;
        createdObject.id = objetDiv.id;
        document.body.append(createdObject);
    }
}
objetDiv.createElem();


//Creation d'une class
class ObjectHTML {
    tag = "";
    style = [];
    content = {
        texte: "",
        elementHTML: {}
    };
    id = "";
    createElem = () => {
        const createdObject = document.createElement(this.tag);
        createdObject.textContent = this.content.texte;
        createdObject.id = this.id;
        document.body.append(createdObject);
    };
}

//Instanciation d'un objet à partir d'une classe
const divNewElem = new ObjectHTML();
divNewElem.tag = "div";
divNewElem.content.texte = "div texte";
divNewElem.createElem();


const spanNewElem = new ObjectHTML();
spanNewElem.tag = "span";
spanNewElem.content.texte = "span texte";
spanNewElem.createElem();


delete (divNewElem);
delete (spanNewElem);


// creation d'une classe et utilisation du constructor
class NewObjectHTML {
    tag = "";// ou tag;
    style = [];
    content = {
        texte: "",
        elementHTML: {}
    };
    id = "";

    constructor(tagParam, textParam = "", idParam = "") {
        this.tag = tagParam;
        this.content.texte = textParam;
        this.id = idParam;

        this.createElem();
    }

    createElem = () => {
        const createdObject = document.createElement(this.tag);
        createdObject.textContent = this.content.texte;
        createdObject.id = this.id;
        document.body.append(createdObject);
    };
}


const spanElem = new NewObjectHTML("span", "mon texte en span");