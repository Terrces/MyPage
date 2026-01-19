const Fetchjson = await fetch("./Files/Data/Games.json")
let parsedjson = await Fetchjson.json();
const jsonObject = parsedjson

const container = document.getElementById("games");
const descriptionNotFocused = "40%"

function createLink(data, text)
{
    const element = document.createElement("a");
    if (data != ""){
        element.href = data;
        element.target = "_blank";
        element.textContent = text;
        return element;
    }
    else{
        return "";
    }
}

function createCard(gameData) {
    let subContainer = document.createElement("div");
    let linksContainer = document.createElement("div");
    subContainer.className = "Game-Card";

    let coverContainer = document.createElement("div");
    coverContainer.className = "cover";

    let descriptionContainer = document.createElement("div");
    descriptionContainer.className = "Description";

    let cover = document.createElement("img");
    let cardName = document.createElement("h3");
    let cardDescription = document.createElement("h5");
    
    cover.src = `./Files/Covers/${gameData.cover}`;
    cover.alt = "Cover Image";

    cardName.textContent = gameData.title;
    cardDescription.textContent = gameData.description;

    linksContainer.append(
        createLink(gameData.links.itch,"Itch.io"),
        createLink(gameData.links.pages,"Pages"),
        createLink(gameData.links.repo,"Repo"))
    descriptionContainer.append(cardName, cardDescription, linksContainer);
    coverContainer.appendChild(cover);
    subContainer.append(coverContainer, descriptionContainer);
    container.appendChild(subContainer);
    
    cardLinksShow(linksContainer,false)
    cardMarginAnimations(coverContainer,"0px 0px 32px 0px")
    cardMarginAnimations(descriptionContainer,"0px -32px 0px 32px")
    cardDescription.style.transition = "0.2s ease-in-out"
    cardDescription.style.borderLeft = "2px solid transparent"
    cardDescription.style.paddingLeft = "0px"
    descriptionContainer.style.opacity = descriptionNotFocused;

    subContainer.addEventListener("mouseenter", () => {
        subContainer.style.opacity = "100%";
        descriptionContainer.style.opacity = "100%";
        cardDescription.style.borderLeft = "2px solid white"
        cardDescription.style.paddingLeft = "8px"
        cardLinksShow(linksContainer, true);
        cardMarginAnimations(coverContainer,"0px")
        cardMarginAnimations(descriptionContainer, "0px 0px 8px 0px")
    })
    
    subContainer.addEventListener("mouseleave", () => {
        cardLinksShow(linksContainer, false);
        descriptionContainer.style.opacity = descriptionNotFocused;
        cardDescription.style.paddingLeft = "0px"
        cardDescription.style.borderLeft = "2px solid transparent"
        cardMarginAnimations(coverContainer,"0px 0px 32px 0px")
        cardMarginAnimations(descriptionContainer,"0px -32px 0px 32px")
    })
}
async function cardMarginAnimations(_element, margin){
    _element.style.margin = await margin;
}
function cardLinksShow(_element, IsEntered){
    if(IsEntered){
        _element.style.transition = "0.2s ease-in-out"
        _element.style.opacity = "100%"
        _element.style.margin = "0px"
    }
    else{
        _element.style.opacity = "0%"
        _element.style.margin = "0px -32px 0px -32px"
    }
}

for (const game in jsonObject) {
    if (jsonObject.hasOwnProperty(game)) {
        createCard(jsonObject[game]);
    }
}