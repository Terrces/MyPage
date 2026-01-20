import {cardFocused, cardLostFocus, createLink} from "./cardVisual.js"

const Fetchjson = await fetch("./Files/Data/Games.json")
const parsedjson = await Fetchjson.json();
const jsonObject = parsedjson

const container = document.getElementById("games");

function createCard(gameData) {
    let subContainer = document.createElement("div");
    let linksContainer = document.createElement("div");
    let coverContainer = document.createElement("div");
    let descriptionContainer = document.createElement("div");

    let cover = document.createElement("img");
    let cardName = document.createElement("h3");
    let cardDescription = document.createElement("h5");
    
    subContainer.className = "Game-Card";
    coverContainer.className = "cover";
    descriptionContainer.className = "Description";
    
    cover.src = `./Files/Covers/${gameData.cover}`;
    cover.alt = "Cover Image";

    cardName.textContent = gameData.title;
    cardDescription.textContent = gameData.description;

    linksContainer.append(
        createLink(gameData.links.itch,"Itch.io"),
        createLink(gameData.links.pages,"Pages"),
        createLink(gameData.links.repo,"Github"));
    descriptionContainer.append(cardName, cardDescription, linksContainer);
    coverContainer.appendChild(cover);
    subContainer.append(coverContainer, descriptionContainer);
    container.appendChild(subContainer);
    
    cardLostFocus(coverContainer, linksContainer, descriptionContainer, cardDescription);
    subContainer.addEventListener("mouseenter", () => cardFocused(coverContainer, linksContainer, descriptionContainer, cardDescription));
    subContainer.addEventListener("mouseleave", () => cardLostFocus(coverContainer, linksContainer, descriptionContainer, cardDescription));
}

for (const game in jsonObject) {
    if (jsonObject.hasOwnProperty(game)) {
        createCard(jsonObject[game]);
    }
}