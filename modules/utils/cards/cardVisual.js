const descriptionNotFocused = "40%"

async function cardMarginAnimations(_element, margin){ _element.style.margin = await margin; }

export function createLink(data, text)
{
    const element = document.createElement("a");
    if (data != ""){
        element.href = data;
        element.target = "_blank";
        element.textContent = text;
        return element;
    }
    else return "";
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

export function cardFocused(coverContainer, linksContainer, descriptionContainer, cardDescription){
    descriptionContainer.style.opacity = "100%";
    cardDescription.style.borderLeft = "2px solid white"
    cardDescription.style.paddingLeft = "8px"
    coverContainer.style.filter = "brightness(105%)"
    cardLinksShow(linksContainer, true);
    cardMarginAnimations(coverContainer,"0px 0px 16px 0px")
    cardMarginAnimations(descriptionContainer, "0px 0px 8px 0px")
}
export function cardLostFocus(coverContainer, linksContainer, descriptionContainer, cardDescription){
    descriptionContainer.style.opacity = descriptionNotFocused;
    cardDescription.style.paddingLeft = "0px"
    cardDescription.style.borderLeft = "2px solid transparent"
    coverContainer.style.filter = "brightness(80%)"
    cardLinksShow(linksContainer, false);
    cardMarginAnimations(coverContainer,"0px 0px 8px 0px")
    cardMarginAnimations(descriptionContainer,"0px 32px 0px 32px")
}